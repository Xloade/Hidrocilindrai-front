<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <MyHeader :name="title" />
    </template>
    <div class="h-screen">
      <div class="row p-3">
        <div class="viewport col-lg-6 col-12">
          <Viewport
            :id="id"
            ref="viewport"
            :selected-part="selectedPart"
            :cylinder="cylinder"
          />
        </div>
        <div class="cylinderPannel col-lg-6 col-12">
          <CylinderPannel
            :id="id"
            @changed="getCylinder()"
            @selected-part="(part) => selectedPart = part"
          />
        </div>
      </div>
    </div>
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '~/layouts/authenticatedLayout.vue'
import MyHeader from '@/components/header.vue'
import Viewport from '~/components/3dView.vue'
import CylinderPannel from "@/components/cylinderPannel.vue"
export default {

  components: {
    BreezeAuthenticatedLayout,
    MyHeader,
    Viewport,
    CylinderPannel
  },

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
      this.$axios.get("/api/cylinder/"+this.id).then(response => (this.cylinder = response.data));
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
</style>
