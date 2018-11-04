import Vue from 'vue'
import App from './about.vue'
import myHeader from '../component/my-header'
import myFooter from '../component/my-footer'
import '../../css/about.scss'


Vue.component(myHeader.name, myHeader)
Vue.component(myFooter.name, myFooter)

new Vue({
  el: '#about',
  render: h => h(App)
})


/*
new Vue({
  render: h => h(App)
}).$mount('#app')
*/
