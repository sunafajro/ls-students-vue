import Vue from "vue";
import App from "./App.vue";
import store from "./store";

const el = document.getElementById("app");
Vue.config.productionTip = false;

new Vue({
  store,
  render: h =>
    h(App, {
      props: {
        studentId: el.dataset.student
      }
    })
}).$mount("#app");
