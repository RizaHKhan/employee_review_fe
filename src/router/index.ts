import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    children: [],
    meta: { role: "admin", requiresAuth: true },
  },
  {
    path: "/manager",
    name: "Manager",
    component: () => import("../views/Manager.vue"),
    children: [
      {
        path: "/employees",
        name: "Employees",
        component: () => import("../views/children/manager/Employees.vue"),
      },
    ],
    meta: { role: "manager", requiresAuth: true },
  },
  {
    path: "/employee",
    name: "Employee",
    component: () => import("../views/Employee.vue"),
    children: [],
    meta: { role: "employee", requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    return { path: "login" };
  } else if (to.meta.role && to.meta.role !== store.getters.userRole) {
    return { path: store.getters.userRole };
  }
});

export default router;
