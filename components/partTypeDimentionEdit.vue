<template>
  <div class="">
    <my-alert
      ref="alert"
      class="stickyAlert"
    />
    <b-table
      :items="partDimentions"
      :fields="partDimentionFields"
      primary-key="id"
    >
      <template #cell(tooltip)="row">
        <b-form>
          <b-form-file
            v-model="row.item.pngFile"
            :placeholder="row.item.placeHolder"
            drop-placeholder="Drop file here..."
            accept=".png"
            :state="row.item.ImageExcists"
            size="sm"
            @input="submitFile(row.item)"
          />
        </b-form>
      </template>
      <template #cell(actions)="row">
        <b-button
          variant="danger"
          size="sm"
          @click="removePartTypeDimention(row.item.pivot.id)"
        >
          Remove
        </b-button>
      </template>
    </b-table>
    <b-form>
      <b-form-group
        v-if="dimentions"
        label="Dimention to add:"
        label-cols-sm="4"
      >
        <b-form-select v-model="selectedDimention">
          <b-form-select-option
            v-for="dimention in dimentions"
            :key="dimention.id"
            :value="dimention.id"
          >
            <div class="d-flex">
              <div class="">
                {{ dimention.name }}
              </div>
            </div>
          </b-form-select-option>
        </b-form-select>
      </b-form-group>
      <div class="my-2">
        <b-button
          variant="success"
          @click="addDimention"
        >
          Add
        </b-button>
      </div>
      <b-button
        variant="success"
        @click="$refs.dimentionForm.open(null)"
      >
        Create new
      </b-button>
      <b-button
        variant="info"
        @click="$refs.dimentionForm.open(selectedDimention)"
      >
        Edit (Selected)
      </b-button>
      <b-button
        variant="danger"
        @click="removeDimention(selectedDimention)"
      >
        Delete (Selected)
      </b-button>
      <dimention-form
        ref="dimentionForm"
        @done="(id) => {getDimentions(); selectedDimention = id}"
      />
    </b-form>
  </div>
</template>

<script>
import dimentionForm from "./dimentionForm.vue";
import myAlert from "./myAlert.vue";
export default {
    components:{
        dimentionForm,
        myAlert
    },
    props:["id"],
    data(){
        return{
            partDimentionFields: [
                { key: 'name', label: 'Name'},
                { key: 'tooltip', label: 'Tooltip Image' },
                { key: 'actions', label: 'Actions' }
            ],
            partDimentions: [],
            dimentions:[],
            selectedDimention: null,
        }
    },
    watch:{
        id(){
            this.getpartDimentions();
        }
    },
    created(){
        this.getDimentions();
    },
    methods:{
        getDimentions(){
            this.$axios.get("api/dimention")
            .then(response => {
                this.dimentions = response.data
            })
        },
        getpartDimentions(){
            if (this.id === "") return
            this.$axios.get("/api/partType/"+this.id+"/partTypeDimention")
            .then(response => {
                this.partDimentions = response.data
            })
        },
        addDimention(){
            this.$axios.post("/api/partType/"+this.id+"/partTypeDimention", {dimention_id: this.selectedDimention})
            .then((message) => {
                this.$refs.alert.setAlert(message.data.message, "success")
                this.getpartDimentions()
            })
            .catch((error) => {
                if( error.response.data.message ){
                    this.$refs.alert.setAlert(error.response.data.message, "danger")
                }
                else{
                    this.$refs.alert.setAlert(error.message, "danger")
                }
            })
        },
        removePartTypeDimention(dimention_id){
            this.$axios.delete("/api/partType/"+this.id+"/partTypeDimention/"+dimention_id)
            .then((message) => {
                this.$refs.alert.setAlert(message.data.message, "success")
                this.getpartDimentions()
            })
            .catch((error) => {
                if( error.response.data.message ){
                    this.$refs.alert.setAlert(error.response.data.message, "danger")
                }
                else{
                    this.$refs.alert.setAlert(error.message, "danger")
                }
            })
        },
        removeDimention(){
            this.$axios.delete("/api/dimention/"+this.selectedDimention)
            .then((message) => {
                this.$refs.alert.setAlert(message.data.message, "success")
                this.getDimentions()
            })
            .catch((error) => {
                if( error.response.data.message ){
                    this.$refs.alert.setAlert(error.response.data.message, "danger")
                }
                else{
                    this.$refs.alert.setAlert(error.message, "danger")
                }
            })
        },
        submitFile(partTypeDimention){
            if(partTypeDimention.pngFile === null) return

            let formData = new FormData();
            formData.append("pngFile", partTypeDimention.pngFile);
            this.$axios.post("/api/partType/"+this.id+"/partTypeDimention/"+partTypeDimention.pivot.id+"/pngFile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(_ => {
                partTypeDimention.placeHolder = partTypeDimention.pngFile.name
                partTypeDimention.pngFile = null
                partTypeDimention.ImageExcists = true
            })
            .catch((error) => {
                partTypeDimention.placeHolder = partTypeDimention.pngFile.name
                partTypeDimention.pngFile = null
                if( error.response.data.message ){
                    this.$refs.alert.setAlert(error.response.data.message, "danger")
                }
                else{
                    this.$refs.alert.setAlert(error.message, "danger")
                }
            })
        },
    }
}
</script>
