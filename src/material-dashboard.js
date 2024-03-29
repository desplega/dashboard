// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from "./components/SidebarPlugin";
// Validation plugin used to validate forms
import VeeValidate from "vee-validate";

// asset imports
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "./assets/scss/material-dashboard.scss";

// library auto imports
import "es6-promise/auto";

/**
 * This is the main Light Bootstrap Dashboard Vue plugin where dashboard related plugins are registerd.
 */
export default {
  install(Vue) {
    Vue.use(SideBar);
    Vue.use(VueMaterial);
    Vue.use(VeeValidate, { fieldsBagName: "veeFields" });
  }
};
