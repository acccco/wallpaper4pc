<template>
  <nav id="app-nav" :class="{show:show}">
    <div class="app-nav-icon-wrap x-flex" @click="toggleLinkShow">
      <i class="app-nav-icon el-icon-menu"></i>
    </div>
    <ul class="app-nav-container">
      <router-link to="/" tag="li" class="x-flex" @click.native="toggleLinkShow">
        <i class="el-icon-picture"></i>
      </router-link>
      <router-link to="list" tag="li" class="x-flex" @click.native="toggleLinkShow">
        <i class="el-icon-s-grid"></i>
      </router-link>
      <router-link to="about" tag="li" class="x-flex" @click.native="toggleLinkShow">
        <i class="el-icon-s-custom"></i>
      </router-link>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'appNav',
    data() {
      return {
        show: false
      };
    },
    methods: {
      toggleLinkShow() {
        this.show = !this.show;
      }
    }
  };
</script>
