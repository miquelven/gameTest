import "./assets/main.css";
import "@/assets/dist/build.css";

import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faEye, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faGoogle,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

library.add(faEye, faLightbulb, faGoogle, faFacebookF, faInstagram, faGithub);

import axios from "axios";
import router from "./router";

const app = createApp(App);
app.config.globalProperties.$axios = axios.create({
  baseURL: "http://localhost:3000",
});

app.use(router).component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
