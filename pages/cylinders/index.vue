<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <div class="d-flex">
        <MyHeader :name="title" />
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
            style=""
          >
            <b-link
              class="btn btn-primary"
              :to="`/cylinders/${cylinder.id}`"
            >
              Edit
            </b-link>
            <b-button
              id="openAdd"
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
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '~/layouts/authenticatedLayout.vue'
import MyHeader from '@/components/header.vue'
import myAlert from '~/components/myAlert.vue'
export default {

  components: {
    BreezeAuthenticatedLayout,
    MyHeader,
    myAlert
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
          this.$refs.alert.setAlert(message.data.message, "success")
          this.$nuxt.refresh()
        })
        .catch((error) => {
          if( error.response.data.message ){
            this.$refs.alert.setAlert(error.response.data.message, "danger")
          }
          else{
            this.$refs.alert.setAlert(error.message, "danger")
          }
        })
    }
  }
}
</script>
