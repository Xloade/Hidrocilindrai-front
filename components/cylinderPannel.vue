<template>
    <div>
        <b-tabs content-class="mt-3">
            <b-tab title="First" :active="index==0" v-for="(partGroup, index) in partGroups" :key="getPartGroupKey(partGroup[0]) + 'tab-control'">
                <div :class="['part', {'selected':part.selected}]" v-for="part in partGroup" :key="part.id">
                    {{part.id}}
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
export default {
    props:["id"],
    data(){
        return{
            partGroups:[]
        }
    },
    methods:{
        async getParts(){
            await this.$axios.get("/api/cylinder/"+this.id+"/parts")
            .then(response => this.partGroups = response.data)
        },
        getPartGroupKey(part){
            return part.for_connection.id + '-' + part.cylinder_part_connection.id
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