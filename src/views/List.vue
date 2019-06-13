<template>
  <div class="matrix-wrap pic-list">
    <div class="prev btn" :class="{disabled:pageNum===1}" @click="prev"></div>
    <div class="next btn" @click="next"></div>
    <Matrix :row="row" :col="col" :list="listInfo" ref="matrix" @changeEnd="changeEnd"></Matrix>
    <Slider
      class="vertical-slider"
      v-model="rowTemp"
      vertical
      :step="1"
      :min="2"
      :max="6"
      show-stops>
    </Slider>
    <Slider
      class="horizontal-slider"
      v-model="colTemp"
      :step="1"
      :min="2"
      :max="10"
      show-stops>
    </Slider>
  </div>
</template>

<script>
  import {Slider} from 'element-ui';
  import {debounce} from 'lodash';
  import Matrix from '@/components/ListMatrix';
  import {getWallByPage} from '../service';

  export default {
    name: 'list',
    components: {Matrix, Slider},
    data() {
      return {
        row: 3,
        rowTemp: 3,
        col: 3,
        colTemp: 3,
        pageNum: 1,
        listInfo: [],
        lock: false
      };
    },
    watch: {
      rowTemp(newValue) {
        if (newValue !== this.row) {
          this.rowOrColChange();
        }
      },
      colTemp(newValue) {
        if (newValue !== this.col) {
          this.rowOrColChange();
        }
      }
    },
    mounted() {
      let pageNum = parseInt(this.$route.query.pageNum);
      this.pageNum = Number.isNaN(pageNum) ? 1 : pageNum;
      this.getImageList();
    },
    methods: {
      rowOrColChange: debounce(function () {
        this.$refs.matrix.moveOutImage(() => {
          this.row = this.rowTemp;
          this.col = this.colTemp;
          getWallByPage(this.pageNum, this.row * this.col).then(res => {
            this.$refs.matrix.moveInImage(res.list.map(item => item.uri));
            this.listInfo = res.list;
          });
        });
      }, 500),
      changeEnd() {
        setTimeout(() => {
          this.lock = false;
        }, 2000);
      },
      getImageList() {
        return getWallByPage(this.pageNum, this.row * this.col).then(res => {
          this.$refs.matrix.changeImage(res.list.map(item => item.uri));
          this.listInfo = res.list;
        });
      },
      prev() {
        if (this.lock) return;
        this.lock = true;
        this.pageNum--;
        this.getImageList().then(() => {
          this.$router.replace({query: {pageNum: this.pageNum}});
        });
      },
      next() {
        if (this.lock) return;
        this.lock = true;
        this.pageNum++;
        this.getImageList().then(() => {
          this.$router.replace({query: {pageNum: this.pageNum}});
        });
      }
    }
  };
</script>

<style scoped>

</style>
