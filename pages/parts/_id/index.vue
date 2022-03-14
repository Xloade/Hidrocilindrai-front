<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <MyHeader :name="title"/>
    </template>
    <div class="h-screen">
        <div class="row p-3">
          <Viewport class="col-lg-6 col-12" :id="id" ref="viewport" :cylinder="part" originPlanes/>
          <part-pannel class="col-lg-6 col-12" :id="id" @changed="newPart => {part[0]=newPart; $refs.viewport.loadObjects()}"/>
        </div>
    </div>
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '@/layouts/authenticated.vue'
import MyHeader from '@/components/header.vue'
import Viewport from '@/components/viewport.vue'
import PartPannel from "@/components/partPannel.vue"
export default {
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
    },

    middleware: 'authenticated',

    components: {
        BreezeAuthenticatedLayout,
        MyHeader,
        Viewport,
        PartPannel
    }
}
</script>

<style scoped>
</style>