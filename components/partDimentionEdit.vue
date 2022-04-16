<template>
  <div class="">
    <my-alert
      ref="alert"
      class="stickyAlert"
    />
    <b-table
      :items="dimentions"
      :fields="partDimentionFields"
      primary-key="id"
    >
      <template #cell(value)="row">
        <b-input v-model="row.item.value" />
      </template>
    </b-table>
    <b-button
      variant="success"
      @click="saveAll()"
    >
      Save dimentions
    </b-button>
  </div>
</template>

<script>
import myAlert from "./myAlert.vue";
export default {

  components:{
    myAlert
  },
  props:{
    part:{
      type:Object,
      required: true
    }
  },
  data(){
    return{
      partDimentionFields: [
        { key: 'name', label: 'Name'},
        { key: 'value', label: 'Value' },
      ],
    }
  },
  computed:{
    dimentions(){
      let arr = []
      this.part.possible_dimentions.forEach(element => {
        let valueElement = this.part.dimentions.find(e=>e.part_type_dimention_id === element.id)
        arr.push({
          id: element.id,
          name: element.name,
          value: valueElement !== undefined ? valueElement.value : "",
          created: valueElement !== undefined,
        })
      });
      return arr
    }
  },
  methods:{
    saveAll(){
      Promise.all(
        this.dimentions.map(element => {
          return this.saveDimention(element)
        })
      )
        .then(() => {
          this.$parent.$refs.alert.setAlert("All dimentions saved", "success")
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
    saveDimention(dimention){
      if(!dimention.created && dimention.value==="") return Promise.resolve()
      return this.$axios.post("/api/part/"+this.part.id+"/partDimention",
        {part_type_dimention_id:dimention.id, value:dimention.value})
    }
  }
}
</script>
