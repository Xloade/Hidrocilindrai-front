<template>
  <authenticated-layout>
    <template #header>
      <my-header :name="title" />
    </template>
    <div class="h-screen">
      <div class="row p-3">
        <div class="col-lg-6 col-12 viewport">
          <cylinder-display
            :id="id"
            ref="viewport"
            :cylinder="part"
            origin-planes
          />
        </div>
        <div class="col-lg-6 col-12 partPannel">
          <part-pannel
            :id="id"
            @changed="newPart => {part[0]=newPart; $refs.viewport.loadObjects()}"
          />
        </div>
      </div>
    </div>
  </authenticated-layout>
</template>

<script>
import CylinderDisplay from '~/components/cylinderDisplay.vue'
import PartPannel from "@/components/partPannel.vue"
import MyHeader from '~/components/myHeader.vue'
import AuthenticatedLayout from '~/layouts/authenticatedLayout.vue'
export default {
  components: {
    MyHeader,
    CylinderDisplay,
    PartPannel,
    AuthenticatedLayout
  },

  middleware: 'authenticated',
  data() {
    return {
      part: []
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
      return 'Part: '+this.id
    }
  }
}
</script>

<style scoped>
  .viewport{
    height: calc(100vh - 230px);
  }
  .partPannel{
    height: calc(100vh - 150px);
    overflow-y: auto;
  }
</style>
