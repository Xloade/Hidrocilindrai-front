<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <MyHeader :name="title"/>
    </template>
    <div class="h-screen">
        <div class="d-flex viewportInner p-3">
          <Viewport :id="id" ref="viewport"/>
          <CylinderPannel :id="id" @changed="$refs.viewport.getCylinder()"/>
        </div>
    </div>
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '@/layouts/authenticated.vue'
import MyHeader from '@/components/header.vue'
import Viewport from '@/components/viewport.vue'
import CylinderPannel from "@/components/cylinderPannel.vue"
export default {
    data() {
      return {
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

    middleware: 'authenticated',

    components: {
        BreezeAuthenticatedLayout,
        MyHeader,
        Viewport,
        CylinderPannel
    }
}
</script>

<style scoped>
  .viewportInner{
    height: calc(100% - 138px);
  }
</style>