import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import HomePage from "@/pages/HomePage.vue";
import ExplorePage from "@/pages/ExplorePage.vue";
import AttendancePage from "@/pages/AttendancePage.vue";
import ProcessPage from "@/pages/ProcessPage.vue";
import MainPage from "@/pages/MainPage.vue";
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
            redirect:'/home/hub',
            children:[
                {
                    name:'main',
                    path:'hub',
                    component:MainPage,
                    redirect:'/home/hub/explore',
                    children:[
                        {
                            name:'explore',
                            path:'explore',
                            component:ExplorePage
                        },
                        {
                            name:'attendance',
                            path:'attendance',
                            component:AttendancePage
                        },
                    ]
                },
                {
                    path: '/process/:sid',
                    name: 'process',
                    component: ProcessPage,
                    props: route => ({ sid: route.params.sid})
                }
            ]
        }
    ]
})

export default router