<template>
    <div class="">
        <b-table
            :items="partConnections"
            :fields="partConnectionFields"
            :primary-key="id"
        >

            <template #cell(actions)="row">
                <b-button size="sm" @click="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
                <b-button variant="danger" size="sm">Remove</b-button>
            </template>

            <template #row-details="row">
                <b-form>
                    <b-form-group label-class="x" label="X offset" label-cols-sm="4">
                        <b-form-input v-model="row.item.pivot.x_offset" type="number"/>
                    </b-form-group>
                    <b-form-group label-class="y" label="Y offset" label-cols-sm="4">
                        <b-form-input v-model="row.item.pivot.y_offset" type="number"/>
                    </b-form-group>
                    <b-form-group label-class="z" label="Z offset" label-cols-sm="4">
                        <b-form-input v-model="row.item.pivot.z_offset" type="number"/>
                    </b-form-group>
                    <b-form-group label-class="x" label="X angle offset" label-cols-sm="4">
                        <b-form-input v-model="row.item.pivot.x_angle_offset" type="number"/>
                    </b-form-group>
                    <b-form-group label-class="y" label="Y angle offset" label-cols-sm="4">
                        <b-form-input v-model="row.item.pivot.y_angle_offset" type="number"/>
                    </b-form-group>
                    <b-form-group label-class="z" label="Z angle offset" label-cols-sm="4">
                        <b-form-input v-model="row.item.pivot.z_angle_offset" type="number"/>
                    </b-form-group>
                    <b-button variant="success">Save changes</b-button>
                </b-form>
            </template>
        </b-table>
        <b-form-group label="Connection to add:" label-cols-sm="4" v-if="connectionTypes">
            <b-form-select v-model="selectedConnection">
                <b-form-select-option v-for="connection in connectionTypes" :key="connection.id" :value="connection.id">
                    <div class="d-flex">
                        <div class="">{{connection.name}}</div>
                    </div>
                </b-form-select-option>
            </b-form-select >
            <div class="my-2">
                <b-button variant="info">Add</b-button>
            </div>
        </b-form-group>
    </div>
</template>

<script>
export default {
    props:["id", "connectionTypes"],
    data(){
        return{
            partConnectionFields: [
                { key: 'name', label: 'Connection name'},
                { key: 'actions', label: 'Actions' }
            ],
            partConnections: [],
            selectedConnection: ""
        }
    },
    methods:{
        async getPartConnections(){
            this.$axios.get("/api/part/"+this.id+"/connection")
            .then(response => {
                this.partConnections = response.data
            })
        },
    },
    created(){
        this.getPartConnections();
    }
}
</script>