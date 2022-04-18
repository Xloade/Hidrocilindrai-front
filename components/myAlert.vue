<template>
  <b-alert
    :variant="variant"
    :show="showCount"
    dismissible
    class="myAlert"
    @dismissed="showCount=0"
    @dismiss-count-down="countDownChanged"
  >
    <template v-if="typeof(text) === 'object'">
      <p>
        {{ text.message }}
      </p>
      <ul>
        <li
          v-for="(error, key) in text.errors"
          :key="key"
        >
          {{ error }}
        </li>
      </ul>
    </template>
    <p v-else>
      {{ text }}
    </p>
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
      variant:'',
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.showCount = dismissCountDown
    },
    setAlert(text, variant, dismissSecs = this.dismissSecs){
      this.showCount = dismissSecs
      this.text = text
      this.variant = variant
    },
    parseError(error){
      let result = {}
      if (error.response === undefined) {
        this.setAlert('Unespected error', 'danger')
        throw error
      }
      if(error.response.data.message){
        result.message = error.response.data.message
      } else {
        result.message = "Whoops! Something went wrong."
      }
      if(error.response.data.errors){
        const errorArrays = Object.values(error.response.data.errors)
        result.errors = [].concat(...errorArrays)
      }
      this.setAlert(result, 'danger')
    },
    parseSuccess(success){
      let message = ''
      message = success.data.message
      this.setAlert(message, 'success')
    }
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
