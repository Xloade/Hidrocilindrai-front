<template>
  <div class="">
    <b-table
      :items="partConnections"
      :fields="partConnectionFields"
      primary-key="pivot.id"
    >
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
        >
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
        <b-button
          variant="danger"
          size="sm"
          @click="removeConnection(row.item.pivot.id)"
        >
          Remove
        </b-button>
      </template>

      <template #row-details="row">
        <b-form @click="$emit('selected-connection', row.item.pivot)">
          <b-form-group
            label-class="x"
            label="X offset"
            label-cols-sm="4"
          >
            <b-form-input
              v-model="row.item.pivot.x_offset"
              type="number"
            />
          </b-form-group>
          <b-form-group
            label-class="y"
            label="Y offset"
            label-cols-sm="4"
          >
            <b-form-input
              v-model="row.item.pivot.y_offset"
              type="number"
            />
          </b-form-group>
          <b-form-group
            label-class="z"
            label="Z offset"
            label-cols-sm="4"
          >
            <b-form-input
              v-model="row.item.pivot.z_offset"
              type="number"
            />
          </b-form-group>
          <b-form-group
            label-class="x"
            label="X angle offset"
            label-cols-sm="4"
          >
            <b-form-input
              v-model="row.item.pivot.x_angle_offset"
              type="number"
            />
          </b-form-group>
          <b-form-group
            label-class="y"
            label="Y angle offset"
            label-cols-sm="4"
          >
            <b-form-input
              v-model="row.item.pivot.y_angle_offset"
              type="number"
            />
          </b-form-group>
          <b-form-group
            label-class="z"
            label="Z angle offset"
            label-cols-sm="4"
          >
            <b-form-input
              v-model="row.item.pivot.z_angle_offset"
              type="number"
            />
          </b-form-group>
          <b-button
            variant="success"
            @click="onSubmit(row.item.pivot)"
          >
            Save changes
          </b-button>
        </b-form>
      </template>
    </b-table>
    <b-form-group
      v-if="connectionTypes"
      label="Connection to add:"
      label-cols-sm="4"
    >
      <b-form-select v-model="selectedConnection">
        <b-form-select-option
          v-for="connection in connectionTypes"
          :key="connection.id"
          :value="connection.id"
        >
          <div class="d-flex">
            <div class="">
              {{ connection.name }}
            </div>
          </div>
        </b-form-select-option>
      </b-form-select>
      <div class="my-2">
        <b-button
          variant="success"
          @click="addConnection"
        >
          Add
        </b-button>
      </div>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props:{
    id: {
      type: [Number, String],
      required: true
    },
    connectionTypes: {
      type: Array,
      required: true
    },
  },
  emits: ['selected-connection'],
  data(){
    return{
      partConnectionFields: [
        { key: 'name', label: 'Connection name'},
        { key: 'actions', label: 'Actions' }
      ],
      partConnections: [],
      selectedConnection: null
    }
  },
  created(){
    this.getPartConnections();
  },
  methods:{
    getPartConnections(){
      this.$axios.get("/api/part/"+this.id+"/partConnection")
        .then(response => {
          this.partConnections = response.data
        })
    },
    onSubmit(form){
      this.$axios.put("/api/part/"+this.id+"/partConnection/"+form.id, form)
        .then((message) => {
          this.$parent.$refs.alert.setAlert(message.data.message, "success")
        })
        .catch((error) => {
          if( error.response.data.message ){
            this.$parent.$refs.alert.setAlert(error.response.data.message, "danger")
          }
          else{
            this.$parent.$refs.alert.setAlert(error.message, "danger")
          }
        })
    },
    addConnection(){
      this.$axios.post("/api/part/"+this.id+"/partConnection", {connection_id: this.selectedConnection})
        .then((message) => {
          this.$parent.$refs.alert.setAlert(message.data.message, "success")
          this.getPartConnections()
        })
        .catch((error) => {
          if( error.response.data.message ){
            this.$parent.$refs.alert.setAlert(error.response.data.message, "danger")
          }
          else{
            this.$parent.$refs.alert.setAlert(error.message, "danger")
          }
        })
    },
    removeConnection(connection_id){
      this.$axios.delete("/api/part/"+this.id+"/partConnection/"+connection_id)
        .then((message) => {
          this.$parent.$refs.alert.setAlert(message.data.message, "success")
          this.getPartConnections()
        })
        .catch((error) => {
          if( error.response.data.message ){
            this.$parent.$refs.alert.setAlert(error.response.data.message, "danger")
          }
          else{
            this.$parent.$refs.alert.setAlert(error.message, "danger")
          }
        })
    }
  }
}
</script>
