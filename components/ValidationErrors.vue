<template>
  <b-alert
    v-if="errors.length > 0"
    show
    dismissible
    variant="danger"
  >
    <h5>
      Whoops! Something went wrong.
    </h5>
    <ul>
      <li
        v-for="(error, key) in errors"
        :key="key"
      >
        {{ error }}
      </li>
    </ul>
  </b-alert>
</template>

<script>
export default {
    props:{
      errors: {
        type: Array,
        required: true
      },
    },
}
</script>
