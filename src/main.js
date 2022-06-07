import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/UI/index.js";
import axios from "axios";

const app = createApp(App);


components.forEach((component) => {
  app.component(component.name, component);
});

app.use(store).use(router, axios, VueCookies).mount("#app");
