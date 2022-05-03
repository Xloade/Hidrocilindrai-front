<template>
  <b-modal
    id="DimentionModal"
    centered
    :title="`${isCreating ? 'Creating new':'Updating'} Dimention`"
    :ok-title="isCreating ? 'Create':'Save'"
    ok-variant="success"
    @ok="onSubmit"
  >
    <my-alert ref="alert" />
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        label="Name"
        label-cols-sm="4"
      >
        <b-form-input
          id="name"
          v-model="dimention.name"
          required
        />
      </b-form-group>
      <b-button
        variant="info"
        @click="dimention.name += 'Ø'"
      >
        Add "Ø" to name
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "DimentionForm",
  emits: ['done'],
  data(){
    return{
      id: null,
      dimention:{
        name:"",
      },
      partTypes: []
    }
  },
  computed:{
    isCreating(){
      return this.id === null
    },
  },
  methods:{
    onSubmit(e){
      e.preventDefault();
      this.$axios({
        method: this.isCreating ? 'post':'put',
        url: "/api/dimention/"+(this.isCreating ? '':this.id),
        data: this.dimention
      })
        .then((message) => {
          if(this.isCreating) this.$emit("done", message.data.id)
          else this.$emit("done", this.id)
          this.$parent.$parent.$parent.$parent.$refs.alert.parseSuccess(message)
          this.$bvModal.hide('DimentionModal')
        })
        .catch((error) => {
          this.$refs.alert.parseError(error)
        })
    },
    getDimention(){
      this.$axios.get("/api/dimention/"+this.id)
        .then(response => {
          this.dimention = response.data
        })
    },
    open(id){
      this.id = id
      this.$bvModal.show('DimentionModal')
      if(!this.isCreating){
        this.getDimention()
      }
    },
  },
}
</script>

<style scoped>
    .part-dimention-title-name{
        color: forestgreen;
    }
</style>
