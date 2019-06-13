<template>
  <div class="matrix-wrap">
    <div class="prev btn" :class="{disabled:dayBefore===0}" @click="prev"></div>
    <div class="next btn" @click="next"></div>
    <Matrix ref="matrix" @changeEnd="changeEnd"></Matrix>
  </div>
</template>

<script>
  import Matrix from '@/components/OnePicMatrix';
  import {getWallByBefore} from '../service/';

  export default {
    name: 'onePicture',
    components: {
      Matrix
    },
    data() {
      return {
        dayBefore: 0,
        imageInfo: {
          date: '',
          describe: '',
          filename: '',
          uri: ''
        }
      };
    },
    created() {
      let before = parseInt(this.$route.query.before);
      this.dayBefore = Number.isNaN(before) ? 0 : before;
      this.getImage();
    },
    methods: {
      getImage() {
        return getWallByBefore(this.dayBefore).then(imageInfo => {
          this.imageInfo = imageInfo;
          this.$refs.matrix.showImage(imageInfo.uri);
        });
      },
      changeEnd() {
        setTimeout(() => {
          this.lock = false;
        }, 2000);
      },
      prev() {
        if (this.lock) return;
        this.lock = true;
        this.dayBefore--;
        this.getImage().then(() => {
          this.$router.replace({query: {before: this.dayBefore}});
        });
      },
      next() {
        if (this.lock) return;
        this.lock = true;
        this.dayBefore++;
        this.getImage().then(() => {
          this.$router.replace({query: {before: this.dayBefore}});
        });
      }
    }
  };
</script>
