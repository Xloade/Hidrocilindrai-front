import { shallowMount } from '@vue/test-utils'
import cylinderDisplay from '../../components/myComponents/cylinderDisplay.vue'
import * as THREE from 'three'

describe('cylinderDisplay.vue Test', () => {
  describe('planes Test', () => {
    it('asks to render planes when originPlanes is defined', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        propsData: {
          id: 10,
          selectedPart: undefined,
          cylinder: [],
          originPlanes: true
        },
        methods: {
          init: () => { },
        },
      })
      wrapper.vm.initScene()

      wrapper.vm.addOridingPlanes = jest.fn()
      const spy = jest.spyOn(wrapper.vm, 'addOridingPlanes');
      wrapper.vm.initOriginPlanes()
      expect(spy).toBeCalledTimes(1)
    })
    it('doesn\'t asks to render planes when originPlanes is undefined', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        propsData: {
          originPlanes: undefined
        },
        methods: {
          init: () => { },
        },
      })
      wrapper.vm.initScene()

      wrapper.vm.addOridingPlanes = jest.fn()
      const spy = jest.spyOn(wrapper.vm, 'addOridingPlanes');
      wrapper.vm.initOriginPlanes()
      expect(spy).not.toBeCalled()
    })
    it('creates planes and plane arrows', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        propsData: {
          originPlanes: undefined
        },
        methods: {
          init: () => { },
        },
      })
      wrapper.vm.initScene()

      wrapper.vm.addOridingPlanes()
      expect(wrapper.vm.scene.children).toHaveLength(6)
    })
  });
  describe('object controll test', () => {
    it('loads object group', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        propsData: {
          cylinder: [],
        },
        methods: {
          init: () => { },
        },
      })
      wrapper.vm.initScene()

      wrapper.vm.loadObjects()
      expect(wrapper.vm.scene.children).toHaveLength(1)
    })
    it('posisions elements after load when  is part set up and editing', () => {
      const cylinder = [
        {
          "isPartSetup": true,
          "id": 29,
          "created_at": "2022-05-04T12:07:21.000000Z",
          "updated_at": "2022-05-04T12:07:21.000000Z",
          "cylinder_id": 3,
          "part_connection_id": 13,
          "part_id": 12,
          "cylinder_part_connection_id": null,
          "part": {
            "id": 12,
            "created_at": "2022-05-03T21:24:09.000000Z",
            "updated_at": "2022-05-03T21:24:09.000000Z",
            "x_offset": 1,
            "y_offset": 2,
            "z_offset": 3,
            "x_angle_offset": 4,
            "y_angle_offset": 5,
            "z_angle_offset": 6,
            "connection_id": null
          },
          "part_connection": {
            "editing": true,
            "id": 13,
            "created_at": "2022-05-03T21:24:09.000000Z",
            "updated_at": "2022-05-03T21:24:09.000000Z",
            "x_offset": 7,
            "y_offset": 8,
            "z_offset": 9,
            "x_angle_offset": 10,
            "y_angle_offset": 11,
            "z_angle_offset": 12,
            "connection_id": null,
            "part_id": null
          },
          "parent": null
        }
      ]
      const wrapper = shallowMount(cylinderDisplay, {
        propsData: {
          cylinder: cylinder
        },
        methods: {
          init: () => { },
        },
        watch: {
          selectedPart: () => { }
        }
      })
      wrapper.vm.initScene()
      const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
      const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
      const mesh = new THREE.Mesh(geometry, material);
      wrapper.setData({
        current3dObjects: [mesh],
        cylinderGroup: new THREE.Group()
      })
      wrapper.vm.current3dObjects[0].name = wrapper.vm.cylinder[0].id
      wrapper.vm.afterLoad()
      expect(mesh.position.x).toBe(7)
      expect(mesh.position.y).toBe(8)
      expect(mesh.position.z).toBe(9)
    })
    it('posisions elements after load when  is part set up and not editing', () => {
      const cylinder = [
        {
          "isPartSetup": true,
          "id": 29,
          "created_at": "2022-05-04T12:07:21.000000Z",
          "updated_at": "2022-05-04T12:07:21.000000Z",
          "cylinder_id": 3,
          "part_connection_id": 13,
          "part_id": 12,
          "cylinder_part_connection_id": null,
          "part": {
            "id": 12,
            "created_at": "2022-05-03T21:24:09.000000Z",
            "updated_at": "2022-05-03T21:24:09.000000Z",
            "x_offset": 1,
            "y_offset": 2,
            "z_offset": 3,
            "x_angle_offset": 4,
            "y_angle_offset": 5,
            "z_angle_offset": 6,
            "connection_id": null
          },
          "part_connection": {
            "id": 13,
            "created_at": "2022-05-03T21:24:09.000000Z",
            "updated_at": "2022-05-03T21:24:09.000000Z",
            "x_offset": 7,
            "y_offset": 8,
            "z_offset": 9,
            "x_angle_offset": 10,
            "y_angle_offset": 11,
            "z_angle_offset": 12,
            "connection_id": null,
            "part_id": null
          },
          "parent": null
        }
      ]
      const wrapper = shallowMount(cylinderDisplay, {
        propsData: {
          cylinder: cylinder
        },
        methods: {
          init: () => { },
        },
        watch: {
          selectedPart: () => { }
        }
      })
      wrapper.vm.initScene()
      const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
      const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
      const mesh = new THREE.Mesh(geometry, material);
      wrapper.setData({
        current3dObjects: [mesh],
        cylinderGroup: new THREE.Group()
      })
      wrapper.vm.current3dObjects[0].name = wrapper.vm.cylinder[0].id
      wrapper.vm.afterLoad()
      expect(mesh.position.x).toBe(7)
      expect(mesh.position.y).toBe(8)
      expect(mesh.position.z).toBe(9)
    })
    it('posisions elements after load', () => {
      const cylinder = [
        {
          "id": 29,
          "created_at": "2022-05-04T12:07:21.000000Z",
          "updated_at": "2022-05-04T12:07:21.000000Z",
          "cylinder_id": 3,
          "part_connection_id": 13,
          "part_id": 12,
          "cylinder_part_connection_id": null,
          "part": {
            "id": 12,
            "created_at": "2022-05-03T21:24:09.000000Z",
            "updated_at": "2022-05-03T21:24:09.000000Z",
            "x_offset": 1,
            "y_offset": 2,
            "z_offset": 3,
            "x_angle_offset": 4,
            "y_angle_offset": 5,
            "z_angle_offset": 6,
            "connection_id": null
          },
          "part_connection": {
            "id": 13,
            "created_at": "2022-05-03T21:24:09.000000Z",
            "updated_at": "2022-05-03T21:24:09.000000Z",
            "x_offset": 7,
            "y_offset": 8,
            "z_offset": 9,
            "x_angle_offset": 10,
            "y_angle_offset": 11,
            "z_angle_offset": 12,
            "connection_id": null,
            "part_id": null
          },
          "parent": null
        }
      ]
      const wrapper = shallowMount(cylinderDisplay, {
        propsData: {
          cylinder: cylinder
        },
        methods: {
          init: () => { },
        },
        watch: {
          selectedPart: () => { }
        }
      })
      wrapper.vm.initScene()
      const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
      const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
      const mesh = new THREE.Mesh(geometry, material);
      wrapper.setData({
        current3dObjects: [mesh],
        cylinderGroup: new THREE.Group()
      })
      wrapper.vm.current3dObjects[0].name = wrapper.vm.cylinder[0].id
      wrapper.vm.afterLoad()
      expect(mesh.position.x).toBe(cylinder[0].part.x_offset)
      expect(mesh.position.y).toBe(cylinder[0].part.y_offset)
      expect(mesh.position.z).toBe(cylinder[0].part.z_offset)
    })
    it('makes unselected part transparent', () => {
      const cylinder = [
        {
          "id": 1,
          "part_connection_id": 1,
          "cylinder_part_connection_id": 1
        },
        {
          "id": 2,
          "part_connection_id": 2,
          "cylinder_part_connection_id": 2
        }
      ]
      const selectedPart = {
        "for_connection": {
          "id": 1
        },
        "cylinder_part_connection": {
          "id": 1
        }
      }
      const wrapper = shallowMount(cylinderDisplay, {
        propsData: {
          selectedPart: selectedPart,
          cylinder: cylinder
        },
        methods: {
          init: () => { },
        },
        watch: {
          selectedPart: () => { }
        }
      })
      wrapper.vm.initScene()
      const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
      const material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
      const mesh = new THREE.Mesh(geometry, material);
      const group = new THREE.Group()
      group.add(mesh)
      group.name = 2
      wrapper.vm.makeSelectedTransparent(group)
      expect(mesh.material.opacity).toBe(0.35)
    })
    it('makes selected part not transparent', () => {
      const cylinder = [
        {
          "id": 1,
          "part_connection_id": 1,
          "cylinder_part_connection_id": 1
        },
        {
          "id": 2,
          "part_connection_id": 2,
          "cylinder_part_connection_id": 2
        }
      ]
      const selectedPart = {
        "for_connection": {
          "id": 1
        },
        "cylinder_part_connection": {
          "id": 1
        }
      }
      const wrapper = shallowMount(cylinderDisplay, {
        propsData: {
          selectedPart: selectedPart,
          cylinder: cylinder
        },
        methods: {
          init: () => { },
        },
        watch: {
          selectedPart: () => { }
        }
      })
      wrapper.vm.initScene()
      const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
      const material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
      const mesh = new THREE.Mesh(geometry, material);
      const group = new THREE.Group()
      group.add(mesh)
      group.name = 1
      wrapper.vm.makeSelectedTransparent(group)
      expect(mesh.material.opacity).toBe(1)
    })
  });
  describe('init Test', () => {
    it('calls all inits', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        methods: {
          initScene: jest.fn(),
          initRenderer: jest.fn(),
          initCamera: jest.fn(),
          initControls: jest.fn(),
          initLoaders: jest.fn(),
          initLights: jest.fn(),
          initWindowRiseze: jest.fn(),
          initOriginPlanes: jest.fn(),
          animate: jest.fn(),
          loadObjects: jest.fn(),
        },
      })
      const spies = [
        jest.spyOn(wrapper.vm, 'initScene'),
        jest.spyOn(wrapper.vm, 'initRenderer'),
        jest.spyOn(wrapper.vm, 'initCamera'),
        jest.spyOn(wrapper.vm, 'initControls'),
        jest.spyOn(wrapper.vm, 'initLoaders'),
        jest.spyOn(wrapper.vm, 'initLights'),
        jest.spyOn(wrapper.vm, 'initWindowRiseze'),
        jest.spyOn(wrapper.vm, 'initOriginPlanes'),
        jest.spyOn(wrapper.vm, 'animate'),
        jest.spyOn(wrapper.vm, 'loadObjects')
      ]
      wrapper.vm.init()
      spies.forEach(spy => {
        expect(spy).toBeCalled()
      })
    });
    it('init Camera', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        methods: {
          init: () => { },
        },
      })
      wrapper.setData({
        element: {
          clientWidth: 10,
          clientHeight: 10
        }
      })
      wrapper.vm.initCamera()
      expect(wrapper.vm.camera).toBeDefined()
    })
    it('init lights', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        methods: {
          init: () => { },
        },
      })
      wrapper.setData({
        element: {
          clientWidth: 10,
          clientHeight: 10
        }
      })
      wrapper.vm.initScene()
      wrapper.vm.initLights()
      expect(wrapper.vm.scene.children).toHaveLength(3)
    })
    it('init scene', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        methods: {
          init: () => { },
        },
      })
      wrapper.vm.initScene()
      expect(wrapper.vm.scene).toBeDefined()
    })
    it('init loaders', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        methods: {
          init: () => { },
        },
      })
      wrapper.vm.mtlLoaderImport = jest.fn().mockImplementation(() => { return {load: jest.fn()} })
      wrapper.vm.initLoaders()
      expect(wrapper.vm.textureLoader).toBeDefined()
      expect(wrapper.vm.objLoader).toBeDefined()
      expect(wrapper.vm.mtlLoader).toBeDefined()
    })
    it('init controls', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        methods: {
          init: () => { },
        }
      })
      wrapper.setData({
        renderer: {}
      })
      wrapper.vm.OrbitControlsImport = jest.fn().mockImplementation(() => { return { } })
      wrapper.vm.initControls()
      expect(wrapper.vm.controls).toBeDefined()
    })
    it('init renderer', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        methods: {
          init: () => { },
        }
      })
      wrapper.setData({
        element: {
          appendChild: jest.fn()
        }
      })
      wrapper.vm.THREE.WebGLRenderer = jest.fn().mockImplementation(() => { return { setPixelRatio: jest.fn(), setSize: jest.fn(), domElement: {} } })
      wrapper.vm.initRenderer()
      expect(wrapper.vm.renderer).toBeDefined()
    })
  });
  describe('other Tests', () => {
    it('updates Projection Matrix after resize', () => {
      const wrapper = shallowMount(cylinderDisplay, {
        methods: {
          init: () => { },
        }
      })
      wrapper.setData({
        renderer: {
          setSize: jest.fn()
        },
        camera: {
          updateProjectionMatrix: jest.fn()
        },
        element: {}
      })
      wrapper.vm.addOridingPlanes = jest.fn()
      const spy = jest.spyOn(wrapper.vm.camera, 'updateProjectionMatrix');
      wrapper.vm.onWindowResize()
      expect(spy).toBeCalledTimes(1)
    });
  });
})