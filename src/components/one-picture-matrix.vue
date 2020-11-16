<template>
  <div class="matrix-container"></div>
</template>

<script>
import { makeMatrixChange, mode } from "matrixchange";
import { preLoadImg, getRandom, animateIn, animateOut } from "../util";

export default {
  name: "matrix",
  mounted() {
    this.change = makeMatrixChange(this.$el, {
      row: 7,
      col: 9,
    });
    this.change.matrixChange.$on("changeStart", () => {
      this.$emit("changeStart");
    });
    this.change.matrixChange.$on("changeEnd", () => {
      this.$emit("changeEnd");
    });
  },
  methods: {
    showImage(src) {
      preLoadImg(src).then(() => {
        let animateIndex = getRandom(0, animateIn.length - 1);
        this.change.movePoint(mode[getRandom(0, mode.length - 1)], {
          animate: true,
          classNameIn: "animate__animated animate__" + animateIn[animateIndex],
          classNameOut: "animate__animated animate__" + animateOut[animateIndex],
          image: src,
        });
      });
    },
  },
};
</script>
