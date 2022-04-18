<template>
  <authenticated-layout>
    <template #header>
      <div class="d-flex">
        <my-header :name="title" />
        <b-button
          id="openAdd"
          variant="success"
          @click="$refs.cylinderForm.open(null)"
        >
          Add
        </b-button>
      </div>
    </template>
    <div class="">
      <my-alert ref="alert" />
      <div class="row">
        <div
          v-for="cylinder in cylinders"
          :key="cylinder.id"
          class="col-6 p-2"
        >
          <b-card
            :title="cylinder.name"
            img-src="/images/cylinders/1.png"
            img-alt="Image"
            img-top
            tag="article"
            class="cylinder-card"
          >
            <b-link
              class="btn btn-primary"
              :to="`/cylinders/${cylinder.id}`"
            >
              Edit
            </b-link>
            <b-button
              variant="info"
              @click="$refs.cylinderForm.open(cylinder.id)"
            >
              Edit info
            </b-button>
            <b-button
              variant="danger"
              @click="removeCylinder(cylinder.id)"
            >
              Delete
            </b-button>
          </b-card>
        </div>
      </div>
      <cylinder-form
        ref="cylinderForm"
        @done="(id) => {$router.push('cylinders/'+id)}"
      />
    </div>
  </authenticated-layout>
</template>

<script>
import myAlert from '~/components/myComponents/myAlert.vue'
import MyHeader from '~/components/myComponents/myHeader.vue'
import CylinderForm from '~/components/modals/cylinderForm.vue'
import AuthenticatedLayout from '~/layouts/authenticatedLayout.vue'
export default {

  components: {
    myAlert,
    MyHeader,
    CylinderForm,
    AuthenticatedLayout
  },

  middleware: 'authenticated',
  asyncData ({ $axios }, callback) {
    $axios.get('/api/cylinder')
      .then((res) => {
        callback(null, { cylinders: res.data })
      })
  },
  data() {
    return {
      title: 'My cylinders',
      cylinders: [],
    }
  },
  head() {
    return{
      title: this.title,
    }
  },
  methods:{
    removeCylinder(cylinder_id){
      this.$axios.delete("/api/cylinder/"+cylinder_id)
        .then((message) => {
          this.$refs.alert.parseSuccess(message)
          this.$nuxt.refresh()
        })
        .catch((error) => {
          this.$refs.alert.parseError(error)
        })
    }
  }
}
</script>
