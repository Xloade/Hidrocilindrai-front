<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <MyHeader :name="title" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            You're logged in!
          </div>
        </div>
      </div>
    </div>
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '~/layouts/authenticatedLayout.vue'
import MyHeader from '@/components/header.vue'
export default {

    components: {
        BreezeAuthenticatedLayout,
        MyHeader
    },

    middleware: 'authenticated',
    data() {
      return {
        title: 'Dashboard'
      }
    },
    head() {
        return{
            title: this.title,
        }
    }
}
</script>
