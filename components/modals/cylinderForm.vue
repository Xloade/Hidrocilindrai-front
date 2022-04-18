<template>
  <div>
    <b-modal
      id="CylinderModal"
      centered
      :title="`${isCreating ? 'Creating new':'Updating'} Cylinder`"
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
            v-model="cylinder.name"
            required
          />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  emits: ['done'],
  data(){
    return{
      id: null,
      cylinder:{
        name:"",
      },
      emptyCylinder: {
        name:"",
      }
    }
  },
  computed:{
    isCreating(){
      return this.id === null
    },
  },
  methods:{
    onSubmit(e){
      e.preventDefault()
      this.$axios({
        method: this.isCreating ? 'post':'put',
        url: "/api/cylinder/"+(this.isCreating ? '':this.id),
        data: this.cylinder
      })
        .then((message) => {
          this.$parent.$refs.alert.parseSuccess(message)
          if(this.isCreating) this.$emit("done", message.data.id)
          this.$bvModal.hide('CylinderModal')
        })
        .catch((error) => {
          this.$refs.alert.parseError(error)
        })
    },
    getCylinder(){
      this.$axios.get("/api/cylinder/"+this.id)
        .then(response => {
          this.cylinder.name = response.data.name
        })
    },
    open(id){
      this.id = id
      this.$bvModal.show('CylinderModal')
      if(!this.isCreating){
        this.getCylinder()
      } else [
        this.cylinder = this.emptyCylinder
      ]
    },
  },
}
</script>

<style scoped>
    .part-cylinder-title-name{
        color: forestgreen;
    }
</style>
