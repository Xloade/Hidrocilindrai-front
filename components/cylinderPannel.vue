<template>
    <div>
        <div class="mt-3">
            <b-alert 
                :variant="alert.variant" 
                :show="alert.showCount" 
                @dismissed="alert.showCount=0" 
                @dismiss-count-down="countDownChanged" 
                dismissible
            >
                <p>{{alert.text}}</p>
                <b-progress
                    :variant="alert.variant"
                    :max="alert.dismissSecs"
                    :value="alert.showCount"
                    height="4px"
                />
                </b-alert>
            <b-tabs content-class="mt-3">
                <b-tab :title="partGroup[0].connection.part_type.name" :active="index==0" v-for="(partGroup, index) in partGroups" :key="getPartGroupKey(partGroup[0]) + 'tab-control'">
                    <table class="w-100">
                        <tbody class="table">
                            <tr :class="['part', {'bg-success':part.selected}]" v-for="part in partGroup" :key="part.id">
                                <td>
                                    {{part.id}}
                                </td>
                                <td>
                                    <b-button @click="addPart(part)" v-if="!part.selected" variant="success">
                                        Add
                                    </b-button>
                                    <b-button @click="removePart(part)" v-if="part.selected" variant="danger">
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
export default {
    props:["id"],
    data(){
        return{
            partGroups:[],
            alert : {text:'', showCount:'0', dismissSecs:'10', variant:''}
        }
    },
    methods:{
        async getParts(){
            await this.$axios.get("/api/cylinder/"+this.id+"/parts")
            .then(response => this.partGroups = response.data)
        },
        getPartGroupKey(part){
            return part.for_connection.id + '-' + part.cylinder_part_connection.id
        },
        async removePart(part){
            await this.$axios.delete("/api/cylinder/"+this.id+"/parts")
            .then(() => {
                this.changed()
            })
            .catch((error) => {
                if( error.response.data.message ){
                    this.setAlert(error.response.data.message, "danger")
                }
                else{
                    this.setAlert(error.message, "danger")
                }
            })
        },
        async addPart(part){
            await this.$axios.post("/api/cylinder/"+this.id+"/parts", {
                part_connection_id: part.connection_id,
                part_id: part.id,
                cylinder_part_connection_id: part.cylinder_part_connection.id
            })
            .then(() => {
                this.changed()
            })
            .catch((error) => {
                if( error.response.data.message ){
                    this.setAlert(error.response.data.message, "danger")
                }
                else{
                    this.setAlert(error.message, "danger")
                }
            })
        },
        countDownChanged(dismissCountDown) {
            this.alert.showCount = dismissCountDown
        },
        setAlert(text, variant){
            this.alert.showCount = this.alert.dismissSecs
            this.alert.text = text
            this.alert.variant = variant
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

<style>
    .part.selected{
        color:red;
    }
</style>