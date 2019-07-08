<template>
  <div class="matrix-wrap one-picture">
    <div class="prev btn" :class="{disabled:dayBefore===0}" @click="prev"></div>
    <div class="next btn" @click="next"></div>
    <Matrix ref="matrix" @changeEnd="changeEnd"></Matrix>
    <a v-if="!lock" :href="baseURL + '/api/wallpaper/download/' + imageInfo.filename"
       class="down-btn btn">
      <i class="el-icon-download"></i>
    </a>
    <div v-if="!lock" class="pic-info">
      <p>{{imageInfo.describe}}</p>
      <p><i class="el-icon-date"></i>{{imageInfo.date}}</p>
    </div>
  </div>
</template>

<script>
  import Matrix from '@/components/OnePicMatrix';
  import {getWallByBefore} from '../service/';
  import {baseURL} from '../service';

  export default {
    name: 'onePicture',
    components: {
      Matrix
    },
    data() {
      return {
        baseURL,
        dayBefore: 0,
        lock: false,
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
        this.lock = false;
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
