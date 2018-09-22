import Vue from 'vue'
import App from './about.vue'

let log = () => {
  console.log('about')
}

log()
new Vue({
  el: '#about',
  render: h => h(App)
})


/*
new Vue({
  render: h => h(App)
}).$mount('#app')
*/
