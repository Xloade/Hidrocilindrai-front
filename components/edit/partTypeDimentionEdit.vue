<template>
  <div class="dimention-edit">
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
          id="add"
          variant="success"
          @click="addDimention"
        >
          Add
        </b-button>
      </div>
      <b-button
        id="create"
        variant="success"
        @click="$refs.dimentionForm.open(null)"
      >
        Create new
      </b-button>
      <b-button
        id="edit"
        variant="info"
        @click="$refs.dimentionForm.open(selectedDimention)"
      >
        Edit (Selected)
      </b-button>
      <b-button
        id="delete"
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
import dimentionForm from '../modals/dimentionForm.vue';
export default {
  name: "PartTypeDimentionEdit",
  components: { dimentionForm },
  props:{
    id: {
      type: [Number, String],
      required: true
    },
  },
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
  created() {
    this.getpartDimentions()
    this.getDimentions()
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
          this.$parent.$parent.$parent.$refs.alert.parseSuccess(message)
          this.getpartDimentions()
        })
        .catch((error) => {
          this.$parent.$parent.$parent.$refs.alert.parseError(error)
        })
    },
    removePartTypeDimention(dimention_id){
      this.$axios.delete("/api/partType/"+this.id+"/partTypeDimention/"+dimention_id)
        .then((message) => {
          this.$parent.$parent.$parent.$refs.alert.parseSuccess(message)
          this.getpartDimentions()
        })
        .catch((error) => {
          console.log(this.$parent)
          this.$parent.$parent.$parent.$refs.alert.parseError(error)
        })
    },
    removeDimention(){
      this.$axios.delete("/api/dimention/"+this.selectedDimention)
        .then((message) => {
          this.$parent.$parent.$parent.$refs.alert.parseSuccess(message)
          this.getDimentions()
        })
        .catch((error) => {
          this.$parent.$parent.$parent.$refs.alert.parseError(error)
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
        .then((message) => {
          partTypeDimention.placeHolder = partTypeDimention.pngFile.name
          partTypeDimention.pngFile = null
          partTypeDimention.ImageExcists = true
          this.$parent.$parent.$parent.$refs.alert.parseSuccess(message)
        })
        .catch((error) => {
          partTypeDimention.placeHolder = partTypeDimention.pngFile.name
          partTypeDimention.pngFile = null
          this.$parent.$parent.$parent.$refs.alert.parseError(error)
        })
    },
  }
}
</script>
