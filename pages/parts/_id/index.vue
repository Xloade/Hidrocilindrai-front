<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <MyHeader :name="title" />
    </template>
    <div class="h-screen">
      <div class="row p-3">
        <div class="col-lg-6 col-12 viewport">
          <Viewport
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
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '@/layouts/authenticated.vue'
import MyHeader from '@/components/header.vue'
import Viewport from '@/components/viewport.vue'
import PartPannel from "@/components/partPannel.vue"
export default {

    components: {
        BreezeAuthenticatedLayout,
        MyHeader,
        Viewport,
        PartPannel
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
