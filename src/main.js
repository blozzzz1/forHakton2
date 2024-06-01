import Vue from 'vue'
import App from './App.vue'


import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Добавление всех иконок из fas (Free Solid Icons) в библиотеку
library.add(fas);

// Регистрация компонента FontAwesomeIcon глобально
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')