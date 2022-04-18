<template>
  <authenticated-layout>
    <template #header>
      <my-header :name="title" />
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
  </authenticated-layout>
</template>

<script>
import MyHeader from '~/components/myHeader.vue'
import AuthenticatedLayout from '~/layouts/authenticatedLayout.vue'
export default {

  components: {
    MyHeader,
    AuthenticatedLayout
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
