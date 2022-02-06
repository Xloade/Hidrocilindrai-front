<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <MyHeader :name="title" />
    </template>
    <div class="h-screen">
        <viewport />
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
        title: 'My cilinders'
      }
    },
    head() {
        return{
            title: this.title,
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