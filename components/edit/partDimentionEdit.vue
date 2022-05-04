<template>
  <div class="part-dimention-edit">
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
export default {
  name: "PartDimentionEdit",
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
        let valueElement = this.part.dimentions.find(e=>e.dimention_id === element.id)
        arr.push({
          id: element.part_type_dimention.id,
          name: element.name,
          value: valueElement !== undefined && valueElement.pivot !== undefined ? valueElement.pivot.value : "",
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
          this.$parent.$refs.alert.parseError(error)
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
