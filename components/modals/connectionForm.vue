<template>
  <div>
    <b-modal
      id="ConnectionModal"
      centered
      :title="`${isCreating ? 'Creating new':'Updating'} Connection`"
      :ok-title="isCreating ? 'Create':'Save'"
      ok-variant="success"
      @ok="onSubmit"
    >
      <my-alert ref="alert" />
      <b-form
        v-if="connection"
        @submit.prevent="onSubmit"
      >
        <b-form-group
          label="Name"
          label-cols-sm="4"
        >
          <b-form-input
            v-model="connection.name"
            required
          />
        </b-form-group>
        <b-form-group
          v-if="partTypes"
          label="Fullfiling part type"
          label-cols-sm="4"
        >
          <b-form-select
            v-model="connection.part_type_id"
            required
          >
            <b-form-select-option
              v-for="partType in partTypes"
              :key="partType.id"
              :value="partType.id"
            >
              <div class="">
                {{ partType.name }}
              </div>
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <h2>
          <span
            v-if="connectionPartType"
            class="part-dimention-title-name"
          >
            {{ connectionPartType.name }}
          </span>
          dimentions
        </h2>
        <part-type-dimention-edit :id="connection.part_type_id" />
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
      connection: null,
      emptyConnection:{
        name:"",
        part_type_id:""
      },
      partTypes: []
    }
  },
  computed:{
    isCreating(){
      return this.id === null
    },
    connectionPartType(){
      return this.partTypes.find(e => e.id===this.connection.part_type_id)
    }
  },
  created(){
    this.getTypes();
  },
  methods:{
    onSubmit(){
      this.$axios({
        method: this.isCreating ? 'post':'put',
        url: "/api/connection/"+(this.isCreating ? '':this.id),
        data: this.connection
      })
        .then((message) => {
          this.$parent.$refs.alert.parseSuccess(message)
          if(this.isCreating) this.$emit("done", message.data.id)
          else this.$emit("done", this.id)
          this.$bvModal.hide('ConnectionModal')
        })
        .catch((error) => {
          this.$refs.alert.parseError(error)
        })
    },
    getConnection(){
      this.$axios.get("/api/connection/"+this.id)
        .then(response => {
          this.connection = response.data
        })
    },
    getTypes(){
      this.$axios.get("/api/parttype")
        .then(response => {
          this.partTypes = response.data
        })
    },
    open(id){
      this.id = id
      this.$bvModal.show('ConnectionModal')
      if(!this.isCreating){
        this.getConnection()
      }
      else{
        this.connection = this.emptyConnection
      }
    },
  }
}
</script>

<style scoped>
    .part-dimention-title-name{
        color: forestgreen;
    }
</style>
