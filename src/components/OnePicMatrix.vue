<template>
  <div class="matrix-container"></div>
</template>

<script>
  import {makeMatrixChange, mode} from 'matrixchange';
  import {preLoadImg, getRandom, animateIn, animateOut} from '../util';
  
  export default {
    name: 'matrix',
    props: ['image'],
    mounted() {
      this.change = makeMatrixChange(this.$el);
      this.change.matrixChange.$on('changeStart', () => {
        this.$emit('changeStart');
      });
      this.change.matrixChange.$on('changeEnd', () => {
        this.$emit('changeEnd');
      });
    },
    methods: {
      showImage(src) {
        preLoadImg(src).then(() => {
          this.change.movePoint(mode[getRandom(0, mode.length - 1)], {
            animate: true,
            classNameIn: 'animated ' + animateIn[getRandom(0, animateIn.length - 1)],
            classNameOut: 'animated ' + animateOut[getRandom(0, animateOut.length - 1)],
            image: src
          });
        });
      }
    }
  };
</script>
