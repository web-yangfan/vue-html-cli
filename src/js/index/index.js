import Vue from 'vue'
import App from './index.vue'
import myHeader from '../component/my-header'
import myFooter from '../component/my-footer'
import '../../css/common.scss'

Vue.component(myHeader.name, myHeader)
Vue.component(myFooter.name, myFooter)

new Vue({
  el: '#home',
  render: h => h(App)
})
