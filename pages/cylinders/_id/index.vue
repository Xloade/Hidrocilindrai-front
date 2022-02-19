<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <MyHeader :name="title" />
    </template>
    <div class="h-screen">
        <viewport :id="id"/>
    </div>
    
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '@/layouts/authenticated.vue'
import MyHeader from '@/components/header.vue'
import Viewport from '@/components/viewport.vue'
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
        Viewport
    }
}
</script>