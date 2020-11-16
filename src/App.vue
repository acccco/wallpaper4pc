<template>
  <div id="app">
    <Nav></Nav>
    <router-view />
  </div>
</template>

<script>
import Nav from "@/views/nav.vue";

export default {
  name: "app",
  components: {
    Nav,
  },
};
</script>
