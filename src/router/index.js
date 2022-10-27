import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from "@/views/MainView";
import SpecialistsView from "@/views/SpecialistsView";
import store from '../store'
import SpecProfileView from "@/views/SpecProfileView";
import UserProfileView from "@/views/UserProfileView";
import SpecAccountTab from "@/components/Profile/Spec/SpecAccountTab";
import SpecTimetableTab from "@/components/Profile/Spec/SpecTimetableTab";
import SecurityTab from "@/components/Profile/SecurityTab";
import SpecReviewsTab from "@/components/Profile/Spec/SpecReviewsTab";
import SpecConfirmationTab from "@/components/Profile/Spec/SpecConfirmationTab";
import SpecClassesTab from "@/components/Profile/Spec/SpecClassesTab";
import SpecMaterials from "@/components/Profile/Spec/SpecMaterialsTab";
import SpecAccountView from "@/views/SpecAccountView";
import UserAccountView from "@/views/UserAccountView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: MainView
    },
    {
        path: '/spec',
        component: SpecProfileView,
        meta: {
            requiredAuth: 'spec'
        },
        children: [
            {
                path: 'account',
                name: 'specAccount',
                component: SpecAccountTab,
            },
            {
                path: 'timetable',
                name: 'specTimetable',
                component: SpecTimetableTab,
            },
            {
                path: 'security',
                name: 'specSecurity',
                component: SecurityTab,
            },
            {
                path: 'reviews',
                name: 'specReviews',
                component: SpecReviewsTab,
            },
            {
                path: 'confirmation',
                name: 'specConfirmation',
                component: SpecConfirmationTab,
            },
            {
                path: 'classes',
                name: 'specClasses',
                component: SpecClassesTab,
            },
            {
                path: 'materials',
                name: 'specMaterials',
                component: SpecMaterials,
            },
        ]
    },
    {
        path: '/user',
        component: UserProfileView,
        meta: {
            requiredAuth: 'user'
        },
        children: []
    },
    {
        path: '/spec/:id',
        name: 'spec',
        component: SpecAccountView
    },
    {
        path: '/user/:id',
        name: 'user',
        component: UserAccountView
    },
    {
        path: '/specialists',
        name: 'specialists',
        component: SpecialistsView
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(el => el.meta.requiredAuth)) {
        if (!(store.getters.isLogin || (localStorage.getItem('token') && localStorage.getItem('email')))) {
            next({name: 'home', query: {redirect: to.fullPath}})
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
