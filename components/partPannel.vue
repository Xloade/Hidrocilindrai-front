<template>
    <div class="component">
        <div class="mt-3">
            <my-alert ref="alert"/>
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
            part: null,
            objFile: null,
            placeHolder: "Choose a file or drop it here..."
        }
    },
    methods:{
        async getParts(){
            await this.$axios.get("/api/part/"+this.id)
            .then(response => {
                this.part = response.data
                // data prepared for 3d viewport
                this.part["finnalOffset"] = this.part
                this.part["part"] = this.part
                this.changed()
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
    }
}
</script>

<style>
    .component{
        min-height: 400px;
    }
</style>