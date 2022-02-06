<template>
  <h2 class="font-semibold text-xl text-gray-800 leading-tight">
    {{ name }}
  </h2>
</template>

<script>
export default {
  name: "MyHeader",

  props: {
    name: String,
  },
};
</script>
