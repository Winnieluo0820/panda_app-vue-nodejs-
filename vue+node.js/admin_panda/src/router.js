
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import loginComponent from './components/login/login'
import mainComponent from './components/main/main'
import product_manageComponent from './components/main/product_manage/product_manage'
import adminComponent from './components/main/admin/admin.vue'
import mobile_userComponent from './components/main/mobile_user/mobile_user.vue'
import editComponent from './components/main/product_manage/edit/edit.vue'
import addproductComponent from './components/main/addproduct/addproduct.vue'
const router = new VueRouter({
    routes: [
        {path: '/', component: loginComponent,name:'login'},
        {path: '/main', component: mainComponent,name:'main',
            children:[
            {path: 'product_manage', component: product_manageComponent,name:'product_manage'},
            {path: 'edit', component: editComponent,name:'edit'},
            {path: 'admin', component: adminComponent,name:'admin'},  
            {path: 'addproduct', component: addproductComponent,name:'adminaddproduct'},  
            {path: 'mobile_user', component:mobile_userComponent,name:'mobile_user'}   
        ]}
    ]
})
export default router;