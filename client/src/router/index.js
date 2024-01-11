import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import PlanList from "../views/PlanList.vue";
import PlanCalendar from "../views/PlanCalendar.vue";
import CategorySelection from "../views/CategorySelection.vue";

Vue.use(Router);

const routes = [
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/plan/list", component: PlanList },
  { path: "/plan/calendar", component: PlanCalendar },
  { path: "/category-selection", component: CategorySelection },
  // 可以加入更多的路由配置
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
