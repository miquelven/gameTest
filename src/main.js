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
  faSpinner,
  faUser,
  faEnvelope,
  faStopwatch,
  faTrophy,
  faBrain,
  faArrowRight,
  faGamepad,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faGoogle,
  faFacebookF,
  faInstagram,
  faVuejs,
  faJs,
  faCss3Alt,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faEye,
  faLightbulb,
  faArrowLeft,
  faCopyright,
  faSpinner,
  faXmark,
  faBars,
  faGoogle,
  faFacebookF,
  faInstagram,
  faGithub,
  faUser,
  faEnvelope,
  faStopwatch,
  faTrophy,
  faBrain,
  faArrowRight,
  faGamepad,
  faCode,
  faVuejs,
  faJs,
  faCss3Alt
);

import axios from "axios";
import router from "./router";
import store from "./store";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { MotionPlugin } from "@vueuse/motion";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import Aos from "aos";
import "aos/dist/aos.css";

import defaultLayout from "./layout/defaultLayout.vue";
import emptyLayout from "./layout/emptyLayout.vue";

axios.defaults.baseURL = import.meta.env.VITE_GAME_TEST_API_URL;

Aos.init();

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 30,
      },
    },
  },
};

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(MotionPlugin)
  .use(Toast)
  .use(vuetify)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("default-layout", defaultLayout)
  .component("empty-layout", emptyLayout);

app.mount("#app");
