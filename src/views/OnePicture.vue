<template>
  <div class="one-picture">
    <div class="prev btn" :class="{disabled:pass===0}" @click="prev"></div>
    <div class="next btn" @click="next"></div>
    <Matrix ref="matrix" :image="imageInfo.uri" @changeEnd="changeEnd"></Matrix>
  </div>
</template>

<script>
  import Matrix from '@/components/Matrix';
  import {getWallByPass} from '../service/';

  export default {
    name: 'onePicture',
    components: {
      Matrix
    },
    data() {
      return {
        pass: 0,
        imageInfo: {
          date: '',
          describe: '',
          filename: '',
          uri: ''
        }
      };
    },
    created() {
      let pass = parseInt(this.$route.query.pass);
      this.pass = Number.isNaN(pass) ? 0 : pass;
      getWallByPass(this.pass).then(imageInfo => {
        this.imageInfo = imageInfo;
      });
    },
    methods: {
      changeEnd() {
        setTimeout(() => {
          this.lock = false;
        }, 2000);
      },
      prev() {
        if (this.lock) return;
        this.lock = true;
        getWallByPass(this.pass - 1).then(imageInfo => {
          this.imageInfo = imageInfo;
          this.pass--;
          this.$router.replace({query: {pass: this.pass}});
        });
      },
      next() {
        if (this.lock) return;
        this.lock = true;
        getWallByPass(this.pass + 1).then(imageInfo => {
          this.imageInfo = imageInfo;
          this.pass++;
          this.$router.replace({query: {pass: this.pass}});
        });
      }
    }
  };
</script>
