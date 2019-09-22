import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";

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
