import "./assets/main.css";
import "./assets/css/build.css";

import { createApp } from "vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faEye,
  faLightbulb,
  faCopyright,
  faArrowLeft,
  faBars,
  faXmark,
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
  faXmark,
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
import Aos from "aos";
import "aos/dist/aos.css";

axios.defaults.baseURL = import.meta.env.VITE_GAME_TEST_API_URL;

Aos.init();

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(MotionPlugin)
  .use(Toast)
  .use(vuetify)
  .component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
