import Vue from "vue";
import VueRouter from "vue-router";
import SignupComponent from "../components/SignupComponent.vue";
import NotFoundComponent from "@/components/NotFoundComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import MainLayout from "@/components/MainLayout.vue";
import store from "@/store/store";
import ChatAreaComponent from "@/components/ChatAreaComponent.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: MainLayout,
        children: [
            {
                path: "",
                name: "chat",
                component: ChatAreaComponent,
                beforeEnter: (to, from, next) => {
                    if (store.getters.isAuthenticated) {
                        next();
                    } else {
                        next({path: "/login", query: {"errorRedirect": "auth"}});
                    }
                }
            },
        ]
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
