<template>
  <div class="outter">
    <div
      id="viewport"
      class="viewport"
    />
  </div>
</template>

<script>
import * as THREE from "three-full";

export default {
  props:["id", "selectedPart", "cylinder", "originPlanes"],
  data() {
    return {
      camera: null,
      controls: null,
      scene: null,
      cylinderGroup: null,
      renderer: null,
      element: null,
      textureLoader: null,
      objLoader: null,
      mtlLoader: null,
      current3dObjects: []
    };
  },
  watch:{
    selectedPart(newVal){
      this.selectPart();
    },
    cylinder(){
      this.loadObjects();
    }
  },
  mounted() {
    this.element = document.getElementById("viewport");
    this.init();
    this.animate();
    // needed only for development when window refreshes with old data
    this.loadObjects();
  },
  methods: {
    init() {
      this.textureLoader = new THREE.TextureLoader();
      this.objLoader = new THREE.OBJLoader();
      this.mtlLoader = new THREE.MTLLoader();

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x555555);
      //this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio); //might be window
      this.renderer.setSize(
        this.element.clientWidth,
        this.element.clientHeight
      );
      this.element.appendChild(this.renderer.domElement);

      // this.camera = new THREE.PerspectiveCamera(
      //   60,
      //   this.element.clientWidth / this.element.clientHeight,
      //   1,
      //   1000
      // );
      this.camera = new THREE.OrthographicCamera(-this.element.clientWidth/2,this.element.clientWidth/2,this.element.clientHeight/2,-this.element.clientHeight/2,0.01,1000)
      this.camera.position.set(500, 150, 0);
      // this.camera.rotation.x = Math.PI/2
      // this.camera.rotation.y = Math.PI
      this.camera.zoom = this.element.clientWidth / 1000 * 1.5
      this.camera.updateProjectionMatrix();

      // controls

      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      //this.controls.listenToKeyEvents( window ); // optional

      //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

      this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.dampingFactor = 0.1;

      this.controls.screenSpacePanning = false;

      this.controls.minDistance = 100;
      this.controls.maxDistance = 500;

      //this.controls.maxPolarAngle = Math.PI / 2;
      // world



      this.mtlLoader.load("/partFiles/textures/materials.mtl", (material)=>{
        material.preload();
        this.objLoader.setMaterials(material);
      });

      // lights

      const dirLight1 = new THREE.DirectionalLight( 0xffffff );
      dirLight1.position.set( 1, 1, 1 );
      this.scene.add( dirLight1 );

      const dirLight2 = new THREE.DirectionalLight( 0x002288 );
      dirLight2.position.set( - 1, - 1, - 1 );
      this.scene.add( dirLight2 );

      const ambientLight = new THREE.AmbientLight(0xcccccc);
      this.scene.add(ambientLight);

      //

      window.addEventListener("resize", this.onWindowResize);
      if(this.originPlanes !== undefined)
        this.addOridingPlanes();
    },
    addOridingPlanes(){
      let planes = [{name:"x", color:0xff0000},{name:"y", color:0x00ff00},{name:"z", color:0x0000ff}]
      planes.forEach((plane)=>{
        let geo = new THREE.PlaneBufferGeometry(200, 200, 8, 8);
        let mat = new THREE.MeshBasicMaterial({
          color: plane.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.3
        });
        let planeMesh = new THREE.Mesh(geo, mat);
        var arrow = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 0),
          100,
          plane.color
        );
        switch (plane.name) {
          case "x":
            planeMesh.rotateZ(90*(Math.PI/180));
            arrow.rotateZ(90*(Math.PI/180));
            break;
          case "y":
            planeMesh.rotateX(90*(Math.PI/180));
            arrow.rotateX(90*(Math.PI/180));
            break;
          case "z":
            planeMesh.rotateY(270*(Math.PI/180));
            arrow.rotateY(270*(Math.PI/180));
            break;

          default:
            break;
        }
        this.scene.add(planeMesh);
        this.scene.add(arrow);
      });
    },
    onWindowResize() {
      // this.camera.aspect = this.element.clientWidth / this.element.clientHeight;
      this.camera.left   = this.element.clientWidth / -2
      this.camera.right  = this.element.clientWidth / 2
      this.camera.top    = this.element.clientHeight / 2
      this.camera.bottom = this.element.clientHeight / -2
      this.camera.zoom = this.element.clientWidth / 1000 * 1.5

      this.camera.updateProjectionMatrix();

      this.renderer.setSize(
        this.element.clientWidth,
        this.element.clientHeight
      );
    },
    animate() {
      window.requestAnimationFrame(this.animate);

      this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    loadObjects(){
      this.scene.remove(this.cylinderGroup)
      this.cylinderGroup = new THREE.Group();
      this.scene.add(this.cylinderGroup);
      this.cylinderGroup.rotation.set(Math.PI/2, Math.PI, 0)
      this.scene.add(this.cylinderGroup)
      // to remove objects if they were here from last time
      this.current3dObjects = [];
      this.cylinder.forEach(element => {
        this.objLoader.load("/partFiles/"+element['part']['id']+".obj", (object) => {
          this.current3dObjects.push(object);
          object.name = element.id;
          this.makeSelectedTransparent(object)
          if(this.checkIfLoadFinished()) this.afterLoad()
        });
      });
    },
    checkIfLoadFinished(){
      return this.current3dObjects.length === this.cylinder.length
    },
    afterLoad(){
      this.current3dObjects.forEach((childrenObject)=>{
        let childrenData = this.cylinder.find((part)=>part.id == childrenObject.name)
        let pivot = new THREE.Group();
        pivot.add(childrenObject)
        if (childrenData.parent) {
          let parentObject = this.current3dObjects.find((object)=>object.name == childrenData.parent.id)
          parentObject.add(pivot)
        }
        else{
          this.cylinderGroup.add(pivot);
        }
        if (!(childrenData.isPartSetup && childrenData.part_connection.editing !== false)) {
          childrenObject.position.x = Number(childrenData['part']['x_offset']);
          childrenObject.position.y = Number(childrenData['part']['y_offset']);
          childrenObject.position.z = Number(childrenData['part']['z_offset']);
          childrenObject.rotation.x = Number(childrenData['part']['x_angle_offset']*(Math.PI/180));
          childrenObject.rotation.y = Number(childrenData['part']['y_angle_offset']*(Math.PI/180));
          childrenObject.rotation.z = Number(childrenData['part']['z_angle_offset']*(Math.PI/180));
        }

        if(childrenData.isPartSetup){
          childrenObject.position.x += Number(childrenData['part_connection']['x_offset']);
          childrenObject.position.y += Number(childrenData['part_connection']['y_offset']);
          childrenObject.position.z += Number(childrenData['part_connection']['z_offset']);
          pivot.rotation.x = Number(childrenData['part_connection']['x_angle_offset']*(Math.PI/180));
          pivot.rotation.y = Number(childrenData['part_connection']['y_angle_offset']*(Math.PI/180));
          pivot.rotation.z = Number(childrenData['part_connection']['z_angle_offset']*(Math.PI/180));
        }
        else{
          pivot.position.x = -(childrenData['part_connection']['x_offset']);
          pivot.position.y = -(childrenData['part_connection']['y_offset']);
          pivot.position.z = -(childrenData['part_connection']['z_offset']);
          pivot.rotation.x = -(childrenData['part_connection']['x_angle_offset']*(Math.PI/180));
          pivot.rotation.y = -(childrenData['part_connection']['y_angle_offset']*(Math.PI/180));
          pivot.rotation.z = -(childrenData['part_connection']['z_angle_offset']*(Math.PI/180));
        }
      })
    },
    selectPart(){
      // quite uneficiant as it makes copies of material every time. But it would need more digging in three.js for more elegant soliution
      this.current3dObjects.forEach((element)=>{
          this.makeSelectedTransparent(element)
        });
    },
    makeSelectedTransparent(element){
      element.children.forEach( ( child ) => {
        if ( child instanceof THREE.Mesh ) {
          let materialArray = child.material;
          // if object has one materials it's object not array
          if(!Array.isArray(materialArray)){
            materialArray = [materialArray]
          }
          materialArray.forEach((material, index)=>{
            materialArray[index] = new THREE.MeshPhongMaterial().copy( material )
            let realPart = this.cylinder.find((part)=>part.id == element.name)
            if(
              this.selectedPart === undefined
              || (realPart.part_connection_id === this.selectedPart.for_connection.id
              && realPart.cylinder_part_connection_id === this.selectedPart.cylinder_part_connection.id)
            ){
              materialArray[index].transparent = false;
              materialArray[index].opacity =  1;
              materialArray[index].depthWrite = true
            }
            else{
              materialArray[index].transparent = true;
              if(materialArray[index].name === "Rubber_-_Soft")
                materialArray[index].opacity =  0.15;
              else
                materialArray[index].opacity =  0.35;
              // materialArray[index].side = THREE.DoubleSide;
              materialArray[index].depthWrite = false
            }
          });
          if(Array.isArray(child.material)){
            child.material = materialArray;
          }
          else{
            child.material = materialArray[0];
          }
        }
      } );
    }
  },
};
</script>

<style scoped>
  .viewport{
    height: calc(100% - 2px);
    box-shadow: 5px 5px 5px grey;
    border-radius: 5px;
  }
  .outter{
    height: 100%;
  }
</style>
