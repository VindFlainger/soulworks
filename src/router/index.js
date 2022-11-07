import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from "@/views/MainView";
import SpecialistsView from "@/views/SpecialistsView";
import store from '../store'
import SpecAccountTab from "@/components/Account/Spec/SpecAccountTab";
import SpecTimetableTab from "@/components/Account/Spec/SpecTimetableTab";
import SecurityTab from "@/components/Account/SecurityTab";
import SpecReviewsTab from "@/components/Account/Spec/SpecReviewsTab";
import SpecConfirmationTab from "@/components/Account/Spec/SpecConfirmationTab";
import SpecClassesTab from "@/components/Account/Spec/SpecClassesTab";
import SpecMaterials from "@/components/Account/Spec/SpecMaterialsTab";
import SpecAccountView from "@/views/SpecAccountView";
import UserAccountView from "@/views/UserAccountView";
import ProfileView from "@/views/ProfileView";
import NotFoundView from "@/views/NotFoundView";
import RulesView from "@/views/RulesView";
import PublicationsView from "@/views/PublicationsView";
import AboutView from "@/views/AboutView";
import SupportView from "@/views/SupportView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: MainView
    },
    {
        path: '/spec',
        component: SpecAccountView,
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
        component: UserAccountView,
        meta: {
            requiredAuth: 'user'
        },
        children: []
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: ProfileView
    },
    {
        path: '/specialists',
        name: 'specialists',
        component: SpecialistsView
    },
    {
        path: '/rules',
        name: 'rules',
        component: RulesView
    },
    {
        path: '/publications',
        name: 'publications',
        component: PublicationsView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/support',
        name: 'support',
        component: SupportView
    },
    {
        path: '*',
        component: NotFoundView
    }
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
