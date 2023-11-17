import {createApp} from "vue";
import App from "./App.vue";
import store from "./store/store";
import vuetify from './plugins/vuetify'
import router from "./router/router";

createApp(App)
    .use(vuetify)
    .use(store)
    .use(router)
    .mount("#app");
