// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SuiVue from 'semantic-ui-vue'
import App from './App'
import store from './store'
import 'semantic-ui-css/semantic.min.css'

Vue.config.productionTip = false
Vue.use(SuiVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
