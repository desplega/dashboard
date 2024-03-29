import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard.vue";
import RegisterDevice from "@/pages/RegisterDevice.vue";
import UserProfile from "@/pages/UserProfile.vue";
import ViewDevice from "@/pages/ViewDevice.vue";
import EditDevice from "@/pages/EditDevice.vue";

// Pages
import Login from "@/pages/Pages/Login.vue";
import NotFound from "@/pages/Pages/NotFound.vue";

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/404",
      name: "NotFound",
      component: NotFound
    }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
  },
  authPages,
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "register-device",
        name: "Register Device",
        component: RegisterDevice,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "view-device/:id",
        name: "View Device",
        component: ViewDevice,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "edit-device/:id",
        name: "Edit Device",
        component: EditDevice,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "*",
    redirect: "/404"
  }
];

export default routes;
