<template>
    <div>
        <b-modal
            centered
            id="UserModal"
            :title="`${isCreating ? 'Creating new':'Updating'} User`"
            :ok-title="isCreating ? 'Create':'Save'"
            ok-variant="success"
            @ok="onSubmit"
        >
            <b-form @submit.prevent="onSubmit" v-if="user">
                <b-form-group label="Name" label-cols-sm="4">
                    <b-form-input v-model="user.name" required/>
                </b-form-group>
                <b-form-group label="E-mail" label-cols-sm="4">
                    <b-form-input v-model="user.email" required/>
                </b-form-group>
                <b-form-group label="Password" label-cols-sm="4">
                    <b-form-input v-model="user.password" required/>
                </b-form-group>
                <b-form-group label="Role" label-cols-sm="4">
                    <b-form-select v-model="user.roles" required>
                        <b-form-select-option v-for="role in roles" :key="role.value" :value="role.value">
                            {{ role.name }}
                        </b-form-select-option>
                    </b-form-select >
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
import partTypeDimentionEdit from "./partTypeDimentionEdit.vue";
export default {
    data(){
        return{
            id: null,
            user: null,
            emptyUser: {
              name: '',
              email: '',
              password: '',
              rules: 'User'
            },
            roles:[
              {
                name: "User",
                value: "User"
              },
              {
                name: "Specialist",
                value: "Specialist"
              },
              {
                name: "Admin",
                value: "Admin"
              }
            ]

        }
    },
    computed:{
        isCreating(){
            return this.id === null
        }
    },
    methods:{
        onSubmit(){
            this.$axios({
                method: this.isCreating ? 'post':'put',
                url: "/api/admin/user/"+(this.isCreating ? '':this.id),
                data: this.user
            })
            .then((message) => {
                if(this.isCreating) this.$emit("done", message.data.id)
                else this.$emit("done", this.id)
                this.$parent.$refs.alert.setAlert(message.data.message, "success")
                this.$bvModal.hide('UserModal')
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
        open(id){
            this.id = id
            this.$bvModal.show('UserModal')
            if(!this.isCreating){
                this.getUser()
            }
            else{
              this.user = this.emptyUser
            }
        },
        getUser(){
          this.$axios.get("/api/admin/user/"+this.id)
            .then((element)=>{
              this.user = element.data
              if (this.user.roles.length > 0) {
                this.user.roles = this.user.roles[0].name
              }
            })
        }
    }
}
</script>

<style scoped>
    .part-dimention-title-name{
        color: forestgreen;
    }
</style>
