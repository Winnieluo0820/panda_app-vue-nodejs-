// import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Vue from 'vue';
import router from './router'
import store from './vuex/store'
import appComponent from './components/app/app.vue'
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(appComponent)
})