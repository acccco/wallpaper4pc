<template>
  <div class="matrix-wrap pic-list">
    <div
      class="prev btn"
      :class="{ disabled: pageNum === 1 }"
      @click="prev"
    ></div>
    <div class="next btn" :class="{ disabled: !hasNext }" @click="next"></div>
    <Matrix
      :row="row"
      :col="col"
      :list="listInfo"
      ref="matrix"
      @changeEnd="changeEnd"
      @showImage="showImage"
    ></Matrix>
    <Slider
      class="vertical-slider"
      vertical
      show-stops
      v-model="rowTemp"
      :disabled="lock"
      :step="1"
      :min="2"
      :max="6"
    >
    </Slider>
    <Slider
      class="horizontal-slider"
      show-stops
      v-model="colTemp"
      :disabled="lock"
      :step="1"
      :min="2"
      :max="10"
    >
    </Slider>
    <Dialog width="80%" class="x-flex" top="0" :visible.sync="imagePreview">
      <div class="img-wrap" :style="imageStyle">
        <a
          v-if="imagePreviewItem.filename"
          :href="
            baseURL + '/api/wallpaper/download/' + imagePreviewItem.filename
          "
          class="btn down-btn"
        >
          <i class="el-icon-download"></i>
        </a>
        <div v-if="imagePreviewItem.describe" class="pic-info">
          <p>{{ imagePreviewItem.describe }}</p>
          <p><i class="el-icon-date"></i>{{ imagePreviewItem.date }}</p>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { Slider, Dialog } from "element-ui";
import debounce from "lodash/debounce";
import Matrix from "@/components/list-matrix";
import { getWallByPage, baseURL } from "../service";

export default {
  name: "list",
  components: { Matrix, Slider, Dialog },
  data() {
    let row = parseInt(localStorage.getItem("__wallpaper-list-row"));
    let col = parseInt(localStorage.getItem("__wallpaper-list-col"));
    return {
      row: Number.isNaN(row) ? 3 : row,
      rowTemp: Number.isNaN(row) ? 3 : row,
      col: Number.isNaN(col) ? 3 : col,
      colTemp: Number.isNaN(col) ? 3 : col,
      pageNum: 1,
      hasNext: true,
      listInfo: [],
      lock: false,
      baseURL,
      imagePreview: false,
      imagePreviewItem: {
        describe: "",
        filename: "",
        date: "",
        uri: "",
      },
    };
  },
  computed: {
    imageStyle() {
      return {
        backgroundImage: `url(${this.imagePreviewItem.uri})`,
      };
    },
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
    },
  },
  mounted() {
    let pageNum = parseInt(this.$route.query.pageNum);
    this.pageNum = Number.isNaN(pageNum) ? 1 : pageNum;
    this.getImageList();
  },
  methods: {
    rowOrColChange: debounce(function () {
      if (this.lock) return;
      this.lock = true;
      this.$refs.matrix.moveOutImage(() => {
        this.row = this.rowTemp;
        this.col = this.colTemp;
        localStorage.setItem("__wallpaper-list-row", this.rowTemp);
        localStorage.setItem("__wallpaper-list-col", this.colTemp);
        getWallByPage(this.pageNum, this.row * this.col).then((res) => {
          this.$refs.matrix.moveInImage(
            res.list.map(
              (item) =>
                `${item.uri}?imageMogr2/thumbnail/${
                  this.col <= 4 ? 640 : 480
                }x/quality/50`
            )
          );
          this.listInfo = res.list;
          this.hasNext = res.hasNext;
        });
      });
    }, 500),
    changeEnd() {
      this.lock = false;
    },
    getImageList() {
      return getWallByPage(this.pageNum, this.row * this.col).then((res) => {
        this.$refs.matrix.changeImage(
          res.list.map(
            (item) =>
              `${item.uri}?imageMogr2/thumbnail/${
                this.col <= 4 ? 640 : 480
              }x/quality/50`
          )
        );
        this.listInfo = res.list;
        this.hasNext = res.hasNext;
      });
    },
    prev() {
      if (this.lock) return;
      this.lock = true;
      this.pageNum--;
      this.getImageList().then(() => {
        this.$router.replace({ query: { pageNum: this.pageNum } });
      });
    },
    next() {
      if (this.lock) return;
      this.lock = true;
      this.pageNum++;
      this.getImageList().then(() => {
        this.$router.replace({ query: { pageNum: this.pageNum } });
      });
    },
    showImage(imageInfo) {
      this.imagePreview = true;
      this.imagePreviewItem = imageInfo;
    },
  },
};
</script>
