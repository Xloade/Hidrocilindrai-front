<template>
  <div class="outter">
    <div class="viewport" id="viewport"></div>
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
      renderer: null,
      element: null,
      textureLoader: null,
      objLoader: null,
      mtlLoader: null,
      current3dObjects: []
    };
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
      this.camera.position.set(200, 150, 0);
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
      let component = this;


      this.mtlLoader.load("/partFiles/textures/materials.mtl", function(material){
        material.preload();
        component.objLoader.setMaterials(material);
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
<<<<<<< HEAD
        var arrow = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 0),
          100,
          plane.color
        );
        let d = "kedddkw";
        switch (plane.name) {
          case "x":
            planeMesh.rotateY(90*(Math.PI/180));
            arrow.rotateY(90*(Math.PI/180));
            break;
          case "y":
            planeMesh.rotateX(90*(Math.PI/180));
            arrow.rotateX(90*(Math.PI/180));
            break;
          case "z":
            planeMesh.rotateZ(270*(Math.PI/180));
            arrow.rotateZ(270*(Math.PI/180));
=======
        switch (plane.name) {
          case "x":
            planeMesh.rotateX(90*(Math.PI/180));
            break;
          case "y":
            planeMesh.rotateY(90*(Math.PI/180));
            break;
          case "z":
            planeMesh.rotateZ(90*(Math.PI/180));
>>>>>>> 964278026780e0a4a4da2236b696c21b545c11d2
            break;
        
          default:
            break;
        }
        this.scene.add(planeMesh);
<<<<<<< HEAD
        this.scene.add(arrow);
=======
>>>>>>> 964278026780e0a4a4da2236b696c21b545c11d2
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
      let component = this;
      // to remove objects if they were here from last time
      this.current3dObjects.forEach(element => component.scene.remove(element))
      this.current3dObjects = [];
      this.cylinder.forEach(element => {
        component.objLoader.load("/partFiles/"+element['part']['id']+".obj", function (object) {
          component.scene.add(object);
          component.current3dObjects.push(object);
          object.name = element.id;

          object.rotateX(Math.PI/2);
          object.rotateY(Math.PI/2);

          object.translateX(element['finnalOffset']['x_offset']);
          object.translateY(element['finnalOffset']['y_offset']);
          object.translateZ(element['finnalOffset']['z_offset']);
          object.rotateX(element['finnalOffset']['x_angle_offset']*(Math.PI/180));
          object.rotateY(element['finnalOffset']['y_angle_offset']*(Math.PI/180));
          object.rotateZ(element['finnalOffset']['z_angle_offset']*(Math.PI/180));
        });
      });
      this.selectPart()
    },
    selectPart(){
      // quite uneficiant as it makes copies of material every time. But it would need more digging in three.js for more elegant soliution
      let component = this;
      this.current3dObjects.forEach((element)=>{
          element.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              let materialArray = child.material;
              // if object has one materials it's object not array
              if(!Array.isArray(materialArray)){
                materialArray = [materialArray] 
              }
              materialArray.forEach((material, index)=>{
                materialArray[index] = new THREE.MeshPhongMaterial().copy( material )
                if(component.selectedPart === undefined || element.name !== component.selectedPart.selected_cylinder_part_connection.id){
                  materialArray[index].transparent = true;
                  if(materialArray[index].name === "Rubber_-_Soft")
                    materialArray[index].opacity =  0.15;
                  else
                    materialArray[index].opacity =  0.35;
                  // materialArray[index].side = THREE.DoubleSide;
                  materialArray[index].depthWrite = false
                }
                else{
                  materialArray[index].transparent = false;
                  materialArray[index].opacity =  1;
                  materialArray[index].depthWrite = true
                }
              });
              if(Array.isArray(child.material)){
                child.material = materialArray;
              }
              else{
                child.material = materialArray[0];
              }
            };
          } );
        });
    }
  },
  mounted() {
    this.element = document.getElementById("viewport");
    this.init();
    this.animate();
    // needed only for development when window refreshes with old data
    this.loadObjects();
  },
  watch:{
    selectedPart(newVal){
      this.selectPart();
    },
    // cylinder(){
    //   this.loadObjects();
    // }
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
    height: calc(100vh - 230px);
  }
</style>