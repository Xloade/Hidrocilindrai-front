<template>
  <authenticated-layout>
    <template #header>
      <my-header :name="title" />
    </template>
    <div class="h-screen">
      <div class="row p-3">
        <div class="viewport col-lg-6 col-12">
          <cylinder-display
            :id="id"
            ref="viewport"
            :selected-part="selectedPart"
            :cylinder="cylinder"
          />
        </div>
        <div class="cylinderPannel col-lg-6 col-12">
          <cylinder-pannel
            :id="id"
            @changed="getCylinder()"
            @selected-part="(part) => selectedPart = part"
          />
        </div>
      </div>
    </div>
  </authenticated-layout>
</template>

<script>
import cylinderDisplay from '~/components/myComponents/cylinderDisplay.vue'
import CylinderPannel from '~/components/pannels/cylinderPannel.vue'
import authenticatedLayout from '~/layouts/authenticatedLayout.vue'
export default {
  components: { authenticatedLayout, CylinderPannel, cylinderDisplay },
  middleware: 'authenticated',
  data() {
    return {
      selectedPart: undefined,
      cylinder: []
    }
  },
  head() {
    return{
      title: this.title,
    }
  },
  computed:{
    id(){
      return this.$route.params.id
    },
    title(){
      return 'Cylinder: '+this.id
    }
  },
  created(){
    this.getCylinder();
  },
  methods:{
    async getCylinder(){
      this.$axios.get("/api/cylinder/"+this.id+"/parts").then(response => (this.cylinder = response.data));
    }
  }
}
</script>

<style scoped>
  .viewport{
    height: calc(100vh - 230px);
  }
  .cylinderPannel{
    height: calc(100vh - 150px);
    overflow-y: auto;
  }
  .alert{
    margin: 0 20px;
  }
</style>
