<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <div class="d-flex">
        <MyHeader :name="title" />
        <b-button
          variant="success"
          @click="add"
        >
          Add
        </b-button>
      </div>
    </template>
    <my-alert ref="alert" />
    <div class="row">
      <div
        v-for="part in parts"
        :key="part.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 p-2"
      >
        <b-card
          :title="part.name"
          :img-src="'/images/parts/'+(part.part_type === null ? 'null' : part.part_type.id)+'.png'"
          img-top
          tag="article"
          style=""
        >
          <p>
            ID: {{ part.id }}
          </p>
          <b-link
            class="btn btn-primary"
            :to="`/parts/${part.id}`"
          >
            Edit
          </b-link>
          <b-button
            variant="danger"
            @click="removePart(part.id)"
          >
            Delete
          </b-button>
        </b-card>
      </div>
    </div>
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '@/layouts/authenticated.vue'
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
        $axios.get('/api/part')
        .then((res) => {
            callback(null, { parts: res.data })
        })
    },
    data() {
      return {
        title: 'Parts',
        parts: []
      }
    },
    head() {
        return{
            title: this.title,
            name: '',
            nameState: null,
        }
    },
    methods:{
      add(){
          this.$axios.post('/api/part')
          .then((response) => {
              this.$router.push("parts/"+response.data.id);
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
      removePart(part_id){
          this.$axios.delete("/api/part/"+part_id)
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

<style scoped>
.card img{
  margin: auto;
  width: 170px;
  height: 170px;
  padding: 5px;
}
</style>
