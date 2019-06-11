<template>
  <div class="matrix-container"></div>
</template>

<script>
  import {makeMatrixChange, mode} from 'matrixchange';
  import {preLoadImg, getRandom} from '../util';

  // animate 下的入场动画的名称
  const inAnimate = [
    'bounceIn',
    'bounceInDown',
    'bounceInLeft',
    'bounceInRight',
    'bounceInUp',
    'fadeIn',
    'fadeInDown',
    'fadeInDownBig',
    'fadeInLeft',
    'fadeInLeftBig',
    'fadeInRight',
    'fadeInRightBig',
    'fadeInUp',
    'fadeInUpBig',
    'flipInX',
    'flipInY',
    'lightSpeedIn',
    'rotateIn',
    'rotateInDownLeft',
    'rotateInDownRight',
    'rotateInUpLeft',
    'rotateInUpRight',
    'rollIn',
    'zoomIn',
    'zoomInDown',
    'zoomInLeft',
    'zoomInRight',
    'zoomInUp',
    'slideInDown',
    'slideInLeft',
    'slideInRight',
    'slideInUp'
  ];

  // animate 下的出场动画的名称
  const outAnimate = [
    'bounceOut',
    'bounceOutDown',
    'bounceOutLeft',
    'bounceOutRight',
    'bounceOutUp',
    'fadeOut',
    'fadeOutDown',
    'fadeOutDownBig',
    'fadeOutLeft',
    'fadeOutLeftBig',
    'fadeOutRight',
    'fadeOutRightBig',
    'fadeOutUp',
    'fadeOutUpBig',
    'flipOutX',
    'flipOutY',
    'lightSpeedOut',
    'rotateOut',
    'rotateOutDownLeft',
    'rotateOutDownRight',
    'rotateOutUpLeft',
    'rotateOutUpRight',
    'hinge',
    'rollOut',
    'zoomOut',
    'zoomOutDown',
    'zoomOutLeft',
    'zoomOutRight',
    'zoomOutUp',
    'slideOutDown',
    'slideOutLeft',
    'slideOutRight',
    'slideOutUp'
  ];

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
    watch: {
      'image'(newValue) {
        console.log(newValue);
        this.showImage(newValue);
      }
    },
    methods: {
      showImage(src) {
        preLoadImg(src).then(() => {
          this.change.movePoint(mode[getRandom(0, mode.length - 1)], {
            animate: true,
            classNameIn: 'animated ' + inAnimate[getRandom(0, inAnimate.length - 1)],
            classNameOut: 'animated ' + outAnimate[getRandom(0, outAnimate.length - 1)],
            image: src
          });
        });
      }
    }
  };
</script>
