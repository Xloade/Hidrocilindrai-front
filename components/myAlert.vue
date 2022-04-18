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
      <h5>
        Whoops! Something went wrong.
      </h5>
      <ul>
        <li
          v-for="(error, key) in text"
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
      variant:''
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.showCount = dismissCountDown
    },
    setAlert(text, variant, dismissSecs = this.dismissSecs){
      this.showCount = dismissSecs
      this.text = text
      if (typeof(text) === 'object') {
        const errorArrays = Object.values(text)
        this.text = [].concat(...errorArrays)
      } else {
        this.text = text
      }
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
