import { shallowMount } from '@vue/test-utils'
import cylinderDisplay from '../../components/myComponents/cylinderDisplay.vue'


describe('Header.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(cylinderDisplay, {
      propsData: {
        id: 10,
        selectedPart: undefined,
        cylinder: [],
        originPlanes: undefined
      }
    })
    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('cylinderDisplay')
  })
})