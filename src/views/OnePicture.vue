<template>
  <div class="one-picture">
    <div class="prev btn"></div>
    <div class="next btn"></div>
    <Matrix ref="matrix"></Matrix>
  </div>
</template>

<script>
  import Matrix from '@/components/Matrix';

  export default {
    name: 'onePicture',
    components: {
      Matrix
    }
  };
</script>
