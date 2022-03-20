<template>
    <b-alert 
      :variant="variant" 
      :show="showCount" 
      @dismissed="showCount=0" 
      @dismiss-count-down="countDownChanged" 
      dismissible
      class="myAlert"
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
.myAlert{
        position: sticky;
        top: 0;
        z-index: 1020;
        margin-top: 10px;
    }
</style>