import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import HomePage from "@/pages/HomePage.vue";
import ExplorePage from "@/pages/ExplorePage.vue";
import AttendancePage from "@/pages/AttendancePage.vue";
import ProcessPage from "@/pages/ProcessPage.vue";
import MainPage from "@/pages/MainPage.vue";
// import {unauthorized} from "@/net/index.js";
import HyperInsight from "@/components/Outpatient/HyperInsight.vue";
import SchedulePage from "@/pages/SchedulePage.vue";

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
                        {
                            name:'schedule',
                            path:'schedule',
                            component:SchedulePage
                        },
                    ]
                },
                {
                    path: '/process/:sid',
                    name: 'process',
                    component: ProcessPage,
                    props: route => ({ 
                        sid: route.params.sid,
                    }),
                }
            ]
        },
        {
            path:'/hyperinsight/:sid',
            name:'hyperinsight',
            component:HyperInsight,
            props: route =>({
                sid:route.params.sid
            })
        }
    ]
})

// 路由守卫，防止未登录可以访问其他页面
// router.beforeEach((to, from, next) => {
//     const isUnauthorized = unauthorized();
//     // 如果目标页面是登录页，且用户已登录，重定向到首页
//     if (to.name === 'login' && !isUnauthorized) {
//         next('/home');
//         return;
//     }
//     // 如果用户未登录且访问非登录页面，则重定向到登录页
//     if (isUnauthorized && to.name !== 'login') {
//         next('/login');
//         return;
//     }
//     // 允许其他路由跳转
//     next();
// });

export default router