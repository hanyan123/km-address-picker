import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import KmAddressPicker from '../packages/index'
Vue.use(ElementUI);
Vue.use(KmAddressPicker)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
