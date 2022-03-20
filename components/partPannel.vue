<template>
    <div class="component">
        <div class="mt-3">
            <my-alert class="stickyAlert" ref="alert"/>
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
            <b-form 
                v-if="part"
                @submit.prevent="onSubmit"
                @click="partForViewport.finnalOffset = part"
            >
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
                    <b-form-select v-model="part.connection_id" required>
                        <b-form-select-option v-for="connection in connectionTypes" :key="connection.id" :value="connection.id">
                            <div class="">{{connection.name}}</div>
                        </b-form-select-option>
                    </b-form-select >
                    <div class="my-2">
                        <b-button variant="success"
                            @click="$refs.connectionForm.open(null)"
                        >Add</b-button>
                        <b-button variant="info"
                            @click="$refs.connectionForm.open(part.connection_id)"
                        >Edit (Selected)</b-button>
                        <b-button variant="danger"
                            @click="deleteConnection()"
                        >Delete (Selected)</b-button>
                    </div>
                </b-form-group>
                <b-button variant="success" type="submit">Save changes</b-button>
            </b-form>
            <h2>Needed Connection edit</h2>
            <part-connection-edit 
                :id="id" 
                :connectionTypes="connectionTypes" 
                @selectedConnection="(selection) => partForViewport.finnalOffset = selection"
            />
            <connection-form ref="connectionForm" @done="(id) => {getConnectionOptions(); part.connection_id = id}"/>
        </div>
    </div>
</template>

<script>
import connectionForm from './connectionForm.vue'
import myAlert from './myAlert.vue'
import partConnectionEdit from './partConnectionEdit.vue'
export default {
    components: { myAlert, partConnectionEdit, connectionForm },
    props:["id"],
    data(){
        return{
            part: null,
            partForViewport: null,
            objFile: null,
            placeHolder: "Choose a file or drop it here...",
            connectionTypes: null,
            connectionEditId: null
        }
    },
    methods:{
        async getParts(){
            this.$axios.get("/api/part/"+this.id)
            .then(response => {
                this.part = response.data
                this.partForViewport = {...this.part, finnalOffset:this.part, part:this.part }
            })

        },
        getConnectionOptions(){
            this.$axios.get("/api/connection")
            .then(response => {
                this.connectionTypes = response.data
            })
        },
        changed(){
            this.$emit("changed", this.partForViewport)
        },
        submitFile(){
            if(this.objFile === null) return

            let formData = new FormData();
            formData.append("objFile", this.objFile);
            this.$axios.post("/api/part/"+this.id+"/objFile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(_ => {
                this.changed()
                this.placeHolder = this.objFile.name
                this.objFile = null
            })
            .catch((error) => {
                this.placeHolder = this.objFile.name
                this.objFile = null
                if( error.response.data.message ){
                    this.$refs.alert.setAlert(error.response.data.message, "danger")
                }
                else{
                    this.$refs.alert.setAlert(error.message, "danger")
                }
            })
        },
        onSubmit(){
            this.$axios.put("/api/part/"+this.id, this.part)
            .then((message) => {
                this.$refs.alert.setAlert(message.data.message, "success")
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
        deleteConnection(){
            this.$axios.delete("/api/connection/"+this.part.connection_id)
            .then((message) => {
                this.$refs.alert.setAlert(message.data.message, "success")
                this.getConnectionOptions(); 
                this.part.connection_id=null;
            })
            .catch((error) => {
                if( error.response.data.message ){
                    this.$refs.alert.setAlert(error.response.data.message, "danger")
                }
                else{
                    this.$refs.alert.setAlert(error.message, "danger")
                }
            })
        }
    },
    created(){
        this.getConnectionOptions()
        this.getParts()
    },
    watch:{
        partForViewport: {
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
</style>

<style scoped>
    .stickyAlert{
        position: sticky;
        top: 10px;
        z-index: 1020;
    }
</style>