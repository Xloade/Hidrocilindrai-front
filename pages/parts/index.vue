<template>
  <BreezeAuthenticatedLayout>
    <template #header>
    <div class="d-flex">
        <MyHeader :name="title" />
        <b-button variant="success" @click="add">Add</b-button>
    </div>
    </template>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="part in parts" :key="part.id">
                <b-card
                    :title="part.name"
                    :img-src="'/images/parts/'+part.part_type.name+'.png'"
                    img-top
                    tag="article"
                    style=""
                >
                  <p>
                    ID: {{part.id}}
                  </p>
                  <b-link class="btn btn-primary" :to="`/parts/${part.id}`">Edit</b-link>
                  <b-button variant="danger">Button</b-button>
                </b-card>
            </div>
        </div>
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '@/layouts/authenticated.vue'
import MyHeader from '@/components/header.vue'
export default {
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
    asyncData ({ $axios }, callback) {
        $axios.get('/api/part')
        .then((res) => {
            callback(null, { parts: res.data })
        })
    },
    methods:{
        add(){
            this.$axios.post('/api/part')
            .then(() => {
                this.$nuxt.refresh()
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
      }
    },

    middleware: 'authenticated',

    components: {
        BreezeAuthenticatedLayout,
        MyHeader,
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