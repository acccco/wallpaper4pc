<template>
  <div class="list-matrix-container" :style="gridStyle" ref="listMatrix">
    <div
      data-baseclass="grip-box"
      class="grip-box"
      v-for="index in row * col"
      :key="index"
      @click="showImage(list[index - 1])"
    >
      <a
        v-if="list[index - 1]"
        :href="baseURL + '/api/wallpaper/download/' + list[index - 1].filename"
        class="down-btn btn"
      >
        <i class="el-icon-download"></i>
      </a>
      <div v-if="list[index - 1]" class="pic-info">
        <p>{{ list[index - 1].describe }}</p>
        <p><i class="el-icon-date"></i>{{ list[index - 1].date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mode } from "matrixchange";
import { makeListMatrixChange } from "../util/matrix";
import { getRandom, animateIn, animateOut } from "../util";
import { baseURL } from "../service";

export default {
  name: "listMatrix",
  props: ["row", "col", "list"],
  data() {
    return {
      baseURL: baseURL,
    };
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateRows: `repeat(${this.row}, ${100 / this.row}%)`,
        gridTemplateColumns: `repeat(${this.col}, ${100 / this.col}%)`,
      };
    },
  },
  mounted() {
    this.change = makeListMatrixChange(this.$refs.listMatrix, {
      row: this.row,
      col: this.col,
    });
    this.change.matrixChange.$on("changeStart", () => {
      this.$emit("changeStart");
    });
    this.change.matrixChange.$on("changeEnd", () => {
      this.$emit("changeEnd");
    });
  },
  methods: {
    changeImage(image) {
      let animateIndex = getRandom(0, animateIn.length - 1);
      this.change.movePoint(mode[getRandom(0, mode.length - 1)], {
        classNameIn: "animate__animated animate__" + animateIn[animateIndex],
        classNameOut: "animate__animated animate__" + animateOut[animateIndex],
        image,
      });
    },
    moveOutImage(callback) {
      this.change.matrixChange.row = this.row;
      this.change.matrixChange.col = this.col;
      this.change.movePoint(mode[getRandom(0, mode.length - 1)], {
        classNameOut:
          "animate__animated animate__" + animateOut[getRandom(0, animateOut.length - 1)],
      });
      this.change.matrixChange.$once("changeEnd", () => {
        setTimeout(callback, 50);
      });
    },
    moveInImage(image) {
      this.change.matrixChange.row = this.row;
      this.change.matrixChange.col = this.col;
      this.change.movePoint(mode[getRandom(0, mode.length - 1)], {
        classNameIn:
          "animate__animated animate__" + animateIn[getRandom(0, animateIn.length - 1)],
        image,
      });
    },
    showImage(item) {
      this.$emit("showImage", item);
    },
  },
};
</script>

<style scoped>
</style>
