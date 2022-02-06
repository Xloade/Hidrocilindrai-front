<template>
  <div class="viewport" id="viewport"></div>
</template>

<script>
import * as THREE from "three-full";

export default {
  data() {
    return {
      camera: null,
      controls: null,
      scene: null,
      renderer: null,
      element: null,
      textureLoader: null,
      objLoader: null,
      mtlLoader: null
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
      this.camera.zoom = this.element.clientHeight / 1000 * 3
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


      this.mtlLoader.load("/parts/textures/materials.mtl", function(material){
        material.preload();
        console.log(material.materials["Powder_Coat_(White)"])
        console.log(material)
        component.objLoader.setMaterials(material);
      });
      this.objLoader.load("/parts/cilindras.obj", function (object) {
        component.scene.add(object);
        object.rotateX(Math.PI/2);
        object.rotateY(Math.PI/2);
      });
      // for ( let i = 0; i < 500; i ++ ) {

      // 	const mesh = new THREE.Mesh( geometry, material );
      // 	mesh.position.x = Math.random() * 1600 - 800;
      // 	mesh.position.y = 0;
      // 	mesh.position.z = Math.random() * 1600 - 800;
      // 	mesh.updateMatrix();
      // 	mesh.matrixAutoUpdate = false;
      // 	this.scene.add( mesh );

      // }

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
    },
    onWindowResize() {
      // this.camera.aspect = this.element.clientWidth / this.element.clientHeight;
      this.camera.left   = this.element.clientWidth / -2
      this.camera.right  = this.element.clientWidth / 2
      this.camera.top    = this.element.clientHeight / 2
      this.camera.bottom = this.element.clientHeight / -2
      this.camera.zoom = this.element.clientHeight / 1000 * 3

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
  },
  mounted() {
    this.element = document.getElementById("viewport");
    this.init();
    this.animate();
  },
};
</script>

<style>
.viewport {
  height: 100%;
  width: 100%;
}
</style>