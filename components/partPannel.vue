<template>
    <div class="component">
        <div class="mt-3">
            <my-alert ref="alert"/>
            
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
            part: null
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