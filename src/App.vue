<template>
  <div id="app">
    <header class="x-row">
      <DatePicker
        align="center"
        type="date"
        placeholder="选择日期"
        v-model="dataValue"
        :picker-options="pickerOptions"
      ></DatePicker>
    </header>
    <div class="x-row wallpaper-container"></div>
    <footer class="x-row">
      <Pagination
        background
        layout="prev, pager, next, jumper"
        :current-page="pageNow"
        :page-sizes="[15, 30, 45, 60]"
        :page-size="15"
        :total="400"
      ></Pagination>
    </footer>
  </div>
</template>

<script>
  import {DatePicker, Pagination} from 'element-ui';

  export default {
    name: 'app',
    components: {
      DatePicker,
      Pagination
    },
    data() {
      return {
        dataValue: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        pageNow: 1
      };
    },
    methods: {}
  };
</script>
