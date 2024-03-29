// =========================================================
// * Vue Material Dashboard - v1.2.1
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import Axios from "axios";

// Make API calls available from any component through this.$http
Vue.prototype.$http = Axios;

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import GlobalConstants from "./globalConstants";

// Make global constants accessible through this.$globals
Vue.prototype.$globals = GlobalConstants;

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

Vue.prototype.$Chartist = Chartist;

Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

// Turn off production tip in JS console
Vue.config.productionTip = false;

// Init authentication
store
  .dispatch("initAuthentication")
  .then(() => {
    // Token is valid
  })
  .catch(err => {
    // Invalid token
    if (process.env.NODE_ENV != "production") console.log(err);
    router.push("/login");
  });

/* eslint-disable no-new */
new Vue({
  i18n,
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  },
  created: function() {
    // Intercept all API calls. In case token expires, redirect to login.
    Axios.interceptors.response.use(undefined, function(err) {
      if (err.response.status === 401) {
        // If you ever get an unauthorized, logout the user and redirect to /login
        store.dispatch("logout").then(() => {
          router.push("/login");
        });
        if (process.env.NODE_ENV != "production") console.log(err);
      }
    });
  }
});
