<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
  import Nav from '@/views/Nav.vue';

  export default {
    name: 'app',
    components: {
      Nav
    }
  };
</script>
