import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RecordAdd from "@/views/record/RecordAdd.vue";
import RecordDetail from "@/views/record/RecordDetail.vue";
import RecordEdit from "@/views/record/RecordEdit.vue";
import CategoryAdd from "@/views/catagory/CategoryAdd.vue";
import CategoryEdit from "@/views/catagory/CategoryEdit.vue";
import NotFound from "@/views/NotFound.vue";
import Statistics from "@/views/Statistics.vue";

Vue.use(VueRouter);
const RouterViewContainer = {
  render(h: Vue.CreateElement) {
    return h("router-view");
  },
};

const routes: Array<RouteConfig> = [
  {
    path: "/record",
    component: RouterViewContainer,
    children: [
      {
        path: "detail",
        component: RecordDetail,
      },
      {
        path: "edit",
        component: RecordEdit,
      },
      {
        path: "add",
        component: RecordAdd,
      },
    ],
  },
  {
    path: "/catagory",
    component: RouterViewContainer,
    children: [
      {
        path: "edit",
        component: CategoryEdit,
      },
      {
        path: "add",
        component: CategoryAdd,
      },
    ],
  },
  {
    path: "/statistics",
    component: Statistics,
  },
  {
    path: "/404",
    component: NotFound,
  },
  {
    path: "/",
    redirect: "/record/add",
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
