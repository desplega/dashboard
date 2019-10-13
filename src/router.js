import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store.js";
import routes from "./routes/routes";

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next("/login");
    }
  } else {
    // If "login" manually requested and logged in then abort the current navigation.
    if (to.fullPath === "/login" && store.getters.isLoggedIn) {
      next(false);
    } else {
      next();
    }
  }
});

export default router;
