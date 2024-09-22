import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            name:'login',
            path:'/LoginPage',
            component:LoginPage
        },
        {
            path:'/',
            redirect:'/LoginPage'
        }
    ]
})

export default router