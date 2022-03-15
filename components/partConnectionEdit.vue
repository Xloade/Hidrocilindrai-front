<template>
    <b-table
        :items="partConnections"
        :fields="partConnectionFields"
        :primary-key="id"
    >

        <template #cell(actions)="row">
            <b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>
        </template>

        <template #row-details="row">
            <b-card>
            <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
            </b-card>
        </template>
    </b-table>
</template>

<script>
export default {
    props:["id"],
    data(){
        return{
            partConnectionFields: [
                { key: 'name', label: 'Connection name'},
                { key: 'actions', label: 'Actions' }
            ],
            partConnections: []
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

<style>

</style>