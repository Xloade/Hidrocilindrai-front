<template>
    <div>
        <b-modal
            centered 
            id="DimentionModal" 
            :title="`${isCreating ? 'Creating new':'Updating'} Dimention`"
            :ok-title="isCreating ? 'Create':'Save'"
            ok-variant="success"
            @ok="onSubmit"
        >
            <b-form @submit.prevent="onSubmit">
                <b-form-group label="Name" label-cols-sm="4">
                    <b-form-input v-model="dimention.name" required/>
                </b-form-group>
                <b-button variant="info" @click="dimention.name += 'Ø'">Add "Ø" to name</b-button>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id: null,
            dimention:{
                name:"",
            },
            partTypes: []
        }
    },
    computed:{
        isCreating(){
            return this.id === null
        },
    },
    methods:{
        onSubmit(){
            this.$axios({
                method: this.isCreating ? 'post':'put',
                url: "/api/dimention/"+(this.isCreating ? '':this.id),
                data: this.dimention
            })
            .then((message) => {
                if(this.isCreating) this.$emit("done", message.data.id)
                else this.$emit("done", this.id)
                this.$parent.$refs.alert.setAlert(message.data.message, "success")
                this.$bvModal.hide('DimentionModal')
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
        getDimention(){
            this.$axios.get("/api/dimention/"+this.id)
            .then(response => {
                this.dimention = response.data
            })
        },
        open(id){
            this.id = id
            this.$bvModal.show('DimentionModal')
            if(!this.isCreating){
                this.getDimention()
            }
        },
    },
}
</script>

<style scoped>
    .part-dimention-title-name{
        color: forestgreen;
    }
</style>