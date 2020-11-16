import Vue from "vue";
import Router from "vue-router";
import OnePicture from "./views/one-picture.vue";
import List from "./views/list.vue";
import About from "./views/about.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: OnePicture,
    },
    {
      path: "/list",
      name: "list",
      component: List,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
