<template>
    <b-alert 
      :variant="variant" 
      :show="showCount" 
      @dismissed="showCount=0" 
      @dismiss-count-down="countDownChanged" 
      dismissible
    >
      <p>{{text}}</p>
      <b-progress
        :variant="variant"
        :max="dismissSecs"
        :value="showCount"
        height="4px"
      />
    </b-alert>
</template>

<script>
export default{
  data(){
    return{
      text:'',
      showCount:'0',
      dismissSecs:'10',
      variant:''
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.showCount = dismissCountDown
    },
    setAlert(text, variant){
        this.showCount = this.dismissSecs
        this.text = text
        this.variant = variant
    },
  }
}
</script>

<style  scoped>

</style>