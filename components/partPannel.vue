<template>
    <div class="component">
        <div class="mt-3">
            <my-alert ref="alert"/>
            <h2>Part file upload</h2>
            <b-form>
                <b-form-group label="OBJ file upload:" label-cols-sm="4">
                    <b-form-file
                        v-model="objFile"
                        :placeholder="placeHolder"
                        drop-placeholder="Drop file here..."
                        @input="submitFile"
                        accept=".obj"
                    />
                </b-form-group>
            </b-form>
            <h2>Part edit</h2>
            <b-form v-if="part">
                <b-form-group label-class="x" label="X offset" label-cols-sm="4">
                    <b-form-input v-model="part.x_offset" type="number"/>
                </b-form-group>
                <b-form-group label-class="y" label="Y offset" label-cols-sm="4">
                    <b-form-input v-model="part.y_offset" type="number"/>
                </b-form-group>
                <b-form-group label-class="z" label="Z offset" label-cols-sm="4">
                    <b-form-input v-model="part.z_offset" type="number"/>
                </b-form-group>
                <b-form-group label-class="x" label="X angle offset" label-cols-sm="4">
                    <b-form-input v-model="part.x_angle_offset" type="number"/>
                </b-form-group>
                <b-form-group label-class="y" label="Y angle offset" label-cols-sm="4">
                    <b-form-input v-model="part.y_angle_offset" type="number"/>
                </b-form-group>
                <b-form-group label-class="z" label="Z angle offset" label-cols-sm="4">
                    <b-form-input v-model="part.z_angle_offset" type="number"/>
                </b-form-group>
                <b-form-group label="Fullfiled connection:" label-cols-sm="4" v-if="connectionTypes">
                    <b-form-select v-model="part.connection">
                        <b-form-select-option v-for="connection in connectionTypes" :key="connection.id" :value="connection.id">
                            <div class="d-flex">
                                <div class="">{{connection.name}}</div>
                            </div>
                        </b-form-select-option>
                    </b-form-select >
                    <div class="my-2">
                        <b-button variant="info">Add</b-button>
                        <b-button variant="info">Edit (Selected)</b-button>
                        <b-button variant="danger">Delete (Selected)</b-button>
                    </div>
                </b-form-group>
            </b-form>
            <h2>Needed Connection edit</h2>
            <part-connection-edit :id="id"/>
        </div>
    </div>
</template>

<script>
import myAlert from './myAlert.vue'
import partConnectionEdit from './partConnectionEdit.vue'
export default {
    components: { myAlert, partConnectionEdit },
    props:["id"],
    data(){
        return{
            part: null,
            objFile: null,
            placeHolder: "Choose a file or drop it here...",
            connectionTypes: null,
            selectedConnection: null,
        }
    },
    methods:{
        async getParts(){
            this.$axios.get("/api/part/"+this.id)
            .then(response => {
                this.part = response.data
                // data prepared for 3d viewport
                this.part["finnalOffset"] = this.part
                this.part["part"] = this.part
            })
        },
        async getConnectionOptions(){
            this.$axios.get("/api/connection")
            .then(response => {
                this.connectionTypes = response.data
            })
        },
        changed(){
            this.$emit("changed", this.part)
        },
        async submitFile(){
            if(this.objFile === null) return

            let formData = new FormData();
            formData.append("objFile", this.objFile);
            await this.$axios.post("/api/part/"+this.id+"/objFile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(_ => {
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
            this.placeHolder = this.objFile.name
            this.objFile = null
        }
    },
    created(){
        this.getParts()
        this.getConnectionOptions()
    },
    watch:{
        part: {
            handler() {
                this.changed()
            },
            deep: true
        },
    }
}
</script>

<style>
    .component{
        min-height: 400px;
    }
    legend.x{
        background: lightcoral;
    }
    legend.y{
        background: lightgreen;
    }
    legend.z{
        background: lightblue;
    }
    .skuffed{
        position: relative;
    }
</style>