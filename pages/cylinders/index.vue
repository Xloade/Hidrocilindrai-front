<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <div class="d-flex">
        <MyHeader :name="title" />
        <b-button
          v-b-modal.modal-prevent-closing
          variant="success"
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
              variant="danger"
              @click="removeCylinder(cylinder.id)"
            >
              Delete
            </b-button>
          </b-card>
        </div>
      </div>

      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Create new cylinder"
        ok-title="Create"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form
          ref="form"
          @submit.stop.prevent="handleSubmit"
        >
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            />
          </b-form-group>
        </form>
      </b-modal>
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
      name: '',
      nameState: null,
    }
  },
  head() {
    return{
      title: this.title,
    }
  },
  methods:{
    add(name){
      this.$axios.post('/api/cylinder', {name: name})
        .then((response) => {
          this.$router.push("cylinders/"+response.data.id)
        })
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.add(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
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
