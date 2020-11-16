<template>
  <div class="x-flex about">
    <div class="about-wrap">
      <img class="head" src="http://blogcdn.acohome.cn/head.jpg" alt="logo" />
      <p class="info">
        矩阵动画：
        <a href="https://github.com/acccco/matrixChange">matrixchange</a>
        动画形式：
        <a href="https://daneden.github.io/animate.css/">Animate.css</a>
      </p>
      <p class="info">
        本站素材所有取自
        <a href="https://cn.bing.com/">bing 搜索</a>，封装接口如下
      </p>
      <Table :data="latestData" style="width: 100%">
        <TableColumn prop="info" label="说明" width="140"> </TableColumn>
        <TableColumn prop="method" label="请求方式" width="80"> </TableColumn>
        <TableColumn prop="uri" label="请求地址" width="340"> </TableColumn>
        <TableColumn prop="param" label="请求参数" width="180"> </TableColumn>
        <TableColumn prop="demo" label="示例" width="440"> </TableColumn>
      </Table>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";

export default {
  components: { Table, TableColumn },
  data() {
    return {
      latestData: [
        {
          info: "获取最新图片",
          method: "get",
          uri: "http://acohome.cn/api/wallpaper/latest",
          param: "-",
          demo: "http://acohome.cn/api/wallpaper/latest",
        },
        {
          info: "获取前 n 天图片",
          method: "get",
          uri: "http://acohome.cn/api/wallpaper/before/:n",
          param: "-",
          demo: "http://acohome.cn/api/wallpaper/before/1",
        },
        {
          info: "分页获取图片",
          method: "get",
          uri: "http://acohome.cn/api/wallpaper",
          param: "pageNum & pageSize",
          demo: "http://acohome.cn/api/wallpaper?pageNum=1&pageSize=10",
        },
      ],
    };
  },
};
</script>
