<template>
  <BreezeAuthenticatedLayout>
    <template #header>
    <div class="d-flex">
        <MyHeader :name="title" />
        <b-button variant="success" v-b-modal.modal-prevent-closing>Add</b-button>
    </div>
    </template>
        <div class="row">
            <div class="col-6 p-2" v-for="cylinder in cylinders" :key="cylinder.id">
                <b-card
                    :title="cylinder.name"
                    img-src="/images/cylinders/1.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style=""
                >
                    <b-link class="btn btn-primary" :to="`/cylinders/${cylinder.id}`">Edit</b-link>
                    <b-button variant="danger">Button</b-button>
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
            <form ref="form" @submit.stop.prevent="handleSubmit">
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
                ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '@/layouts/authenticated.vue'
import MyHeader from '@/components/header.vue'
export default {
    data() {
      return {
        title: 'My cylinders',
        cylinders: []
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
        $axios.get('/api/cylinder')
        .then((res) => {
            callback(null, { cylinders: res.data })
        })
    },
    methods:{
        add(name){
            this.$axios.post('/api/cylinder', {name: name})
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