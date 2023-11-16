import {createApp, configureCompat} from "vue";
import App from "./App.vue";
import store from "./store/store";
import vuetify from './plugins/vuetify'
import router from "./router/router";

// default everything to Vue 3 behavior, and only enable compat
// for certain features
configureCompat({
  MODE: 3,
  OPTIONS_BEFORE_DESTROY: true,
  ATTR_FALSE_VALUE: true
});

createApp(App)
    .use(vuetify)
    .use(store)
    .use(router)
    .mount("#app");
