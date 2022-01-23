import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import SvgSprite from 'vue-svg-sprite';

Vue.config.productionTip = false
const sprite = require('./assets/images/sprite.svg');
Vue.use(SvgSprite, {
  url: sprite,
  class: 'icon'
})

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
