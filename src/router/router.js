import Vue from "vue";
import VueRouter from "vue-router";
import SignupComponent from "../components/SignupComponent.vue";
import NotFoundComponent from "@/components/NotFoundComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import ChatComponent from "@/components/ChatComponent.vue";
import store from "@/store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/chat"
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupComponent,
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatComponent,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAuthenticated) {
        next();
      } else {
        next({path: "/login", query: {"errorRedirect": "auth"}});
      }
    }
  },
  {
    path: "*",
    name: "not-found",
    component: NotFoundComponent
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
