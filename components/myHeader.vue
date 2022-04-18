<template>
  <h2 class="mx-2">
    {{ name }}
  </h2>
</template>

<script>
export default {
  name: "MyHeader",

  props: {
    name: {
      type: String,
      required: true
    }
  },
};
</script>
