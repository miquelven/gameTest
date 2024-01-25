import "./assets/main.css";
import "@/assets/dist/build.css";

import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faEye,
  faLightbulb,
  faCopyright,
  faArrowLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faGoogle,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faEye,
  faLightbulb,
  faArrowLeft,
  faCopyright,
  faBars,
  faGoogle,
  faFacebookF,
  faInstagram,
  faGithub
);

import axios from "axios";
import router from "./router";
import store from "./store";
import { MotionPlugin } from "@vueuse/motion";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";

axios.defaults.baseURL = import.meta.env.VITE_GAME_TEST_API_URL;

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(MotionPlugin)
  .use(Toast)
  .component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
