import {
  createRouter,
  createWebHistory
} from "vue-router";

const routes = [{
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/graphes",
    name: "Graphes",
    component: () => import("../views/Graphes.vue"),
  },
  {
    path: "/schedule",
    name: "Service",
    component: () => import("../views/Schedule/MainPage.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/TestPage.vue"),
  },
  {
    path: "/skills",
    name: "skills",
    component: () => import("../views/Graphs.vue"),
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("../views/CourseCatalog.vue"),
  },
  {
    path: "/courses/:course",
    name: "Course",
    component: () => import("../views/CoursePage.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/RegistrationPage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/RegistrationPage.vue"),
    props: true,
  },
  {
    path: "/me",
    name: "MyPage",
    component: () => import("../views/PersonalAccount.vue"),
  },
  {
    path: "/analytics",
    name:  "Analytics",
    component: () => import("../views/Analytics.vue"),
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;