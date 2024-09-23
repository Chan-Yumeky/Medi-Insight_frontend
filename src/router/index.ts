import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import HomePage from "@/pages/HomePage.vue";
import ExplorePage from "@/pages/ExplorePage.vue";
const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            name:'login',
            path:'/login',
            component:LoginPage
        },
        {
            path:'/',
            redirect:'/login'
        },
        {
            name:'home',
            path:'/home',
            component:HomePage,
            redirect:'/home/explore',
            children:[
                {
                    name:'explore',
                    path:'explore',
                    component:ExplorePage
                }
            ]
        },
    ]
})

export default router