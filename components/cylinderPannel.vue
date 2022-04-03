<template>
    <div class="component">
        <div class="mt-3">
            <my-alert ref="alert"/>
            <b-tabs content-class="mt-3" v-model="activeTab" @input="tabChanged">
                <b-tab :title="partGroup[0].connection.part_type.name" :active="index==0" v-for="(partGroup, index) in partGroups" :key="getPartGroupKey(partGroup[0]) + 'tab-control'">
                    <table class="w-100 table table-hover">
                        <thead>
                            <th>id</th>
                            <th v-for="partTypeDimention in partGroup[0].connection.part_type.dimentions">
                                {{partTypeDimention.name}}
                                <b-icon icon="exclamation-circle-fill" variant="info" :id="'tooltip-target-'+partTypeDimention.id" :key="partTypeDimention.id"/>
                                <b-tooltip :target="'tooltip-target-'+partTypeDimention.id" triggers="hover">
                                    <img :height="200" :src="'/images/partTypeDimentions/'+partTypeDimention.id+'.png'" alt="No tooltip">
                                </b-tooltip>
                            </th>
                            
                            <th>action</th>
                        </thead>
                        <tbody class="table">
                            <tr :class="['part', {'bg-success':part.hasOwnProperty('selected_cylinder_part_connection')}]" v-for="part in partGroup" :key="part.id">
                                <td>
                                    {{part.id}}
                                </td>
                                <th v-for="partTypeDimention in partGroup[0].connection.part_type.dimentions" :key="partTypeDimention.id">
                                    {{partDimention(part, partTypeDimention).value}}
                                </th>
                                <td>
                                    <b-button @click="addPart(part)" v-if="!part.hasOwnProperty('selected_cylinder_part_connection')" variant="success">
                                        Add
                                    </b-button>
                                    <b-button @click="removePart(part)" v-else variant="danger">
                                        Remove
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import myAlert from './myAlert.vue'
export default {
    components: { myAlert },
    props:["id"],
    data(){
        return{
            partGroups:[],
            activeTab: 0
        }
    },
    methods:{
        partDimention(part, dimention){
            let GotDimention = part.dimentions.find(e=>e.part_type_dimention_id === dimention.id)
            return GotDimention || {}
        },
        tabChanged(){
            let tab = this.partGroups[this.activeTab]
            if(tab === undefined || tab.length < 1) return
            let selectionInfo = {
                for_connection: tab[0].for_connection,
                cylinder_part_connection: tab[0].cylinder_part_connection,
            }
            // let part = this.partGroups[this.activeTab].find(element => element.hasOwnProperty('selected_cylinder_part_connection'))
            // this.$emit("selectedPart", part)
            this.$emit("selectedPart", selectionInfo)

        },
        getParts(){
            this.$axios.get("/api/cylinder/"+this.id+"/parts")
            .then(response => this.partGroups = response.data)
        },
        getPartGroupKey(part){
            return part.for_connection.id + '-' + part.cylinder_part_connection.id
        },
        async removePart(part){
            await this.$axios.delete("/api/cylinder/"+this.id+"/parts/"+part.selected_cylinder_part_connection.id)
            .then(() => {
                this.changed()
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
        async addPart(part){
            await this.$axios.post("/api/cylinder/"+this.id+"/parts", {
                part_connection_id: part.for_connection.id,
                part_id: part.id,
                cylinder_part_connection_id: part.cylinder_part_connection.id
            })
            .then(() => {
                this.changed()
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
        changed(){
            this.getParts();
            this.$emit("changed")
        }
    },
    created(){
        this.getParts()
    }
}
</script>

<style scoped>
    .part.selected{
        color:red;
    }
    .component{
        min-height: 400px;
    }
</style>