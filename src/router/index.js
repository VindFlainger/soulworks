import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from "@/views/MainView";

const SpecialistsView = () => import("@/views/SpecialistsView");
const QAView = () => import("@/views/QAView")
const AboutView = () => import("@/views/AboutView")


import store from '../store'
import SpecAccountTab from "@/components/Specialized/Account/Spec/SpecAccountTab";
import SpecTimetableTab from "@/components/Specialized/Account/Spec/SpecTimetableTab";
import SecurityTab from "@/components/Specialized/Account/SecurityTab";
import SpecReviewsTab from "@/components/Specialized/Account/Spec/ReviewsTab/SpecReviewsTab";
import SpecQualificationTab from "@/components/Specialized/Account/Spec/QualificationTab/SpecQualificationTab";
import SpecClassesTab from "@/components/Specialized/Account/Spec/SpecClassesTab";
import SpecMaterialsTab from "@/components/Specialized/Account/Spec/MaterialsTab/SpecMaterialsTab";
import SpecAccountView from "@/views/SpecAccountView";
import UserAccountView from "@/views/UserAccountView";
import ProfileView from "@/views/ProfileView";
import NotFoundView from "@/views/NotFoundView";
import RulesView from "@/views/RulesView";
import PublicationsView from "@/views/PublicationsView";

import SupportView from "@/views/SupportView";
import SpecAccountEditTab from "@/components/Specialized/Account/Spec/SpecAccountEditTab";
import UserAccountTab from "@/components/Specialized/Account/User/UserAccountTab";
import UserAccountEditTab from "@/components/Specialized/Account/User/UserAccountEditTab";
import UserReviewsTab from "@/components/Specialized/Account/User/UserReviewsTab";
import UserClassesTab from "@/components/Specialized/Account/User/UserClassesTab";
import UserMaterialsTab from "@/components/Specialized/Account/User/UserMaterialsTab";
import UserFavouritesTab from "@/components/Specialized/Account/User/UserFavouritesTab";
import ChatsView from "@/views/ChatsView";
import ChatView from "@/views/ChatView";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: MainView,
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
                path: 'edit',
                name: 'specEdit',
                component: SpecAccountEditTab,
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
                path: 'qualification',
                name: 'specQualification',
                component: SpecQualificationTab,
            },
            {
                path: 'classes',
                name: 'specClasses',
                component: SpecClassesTab,
            },
            {
                path: 'materials',
                name: 'specMaterials',
                component: SpecMaterialsTab,
            },
        ]
    },
    {
        path: '/user',
        component: UserAccountView,
        meta: {
            requiredAuth: 'user'
        },
        children: [
            {
                path: 'account',
                name: 'userAccount',
                component: UserAccountTab,
            },
            {
                path: 'edit',
                name: 'userEdit',
                component: UserAccountEditTab,
            },
            {
                path: 'security',
                name: 'userSecurity',
                component: SecurityTab,
            },
            {
                path: 'reviews',
                name: 'userReviews',
                component: UserReviewsTab,
            },
            {
                path: 'classes',
                name: 'userClasses',
                component: UserClassesTab,
            },
            {
                path: 'materials',
                name: 'userMaterials',
                component: UserMaterialsTab,
            },
            {
                path: 'favourites',
                name: 'userFavourites',
                component: UserFavouritesTab,
            },
        ]
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
        path: '/chats',
        name: 'chats',
        component: ChatsView,
    },
    {
        path: '/chat/:id',
        name: 'chat',
        components: {
            chat: ChatView
        },
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
        path: '/qa',
        name: 'qa',
        component: QAView
    },
    {
        path: '*',
        name: 'notfound',
        component: NotFoundView
    },
]

const scrollHandler = (to, from, savedPosition) => {
    if (savedPosition) return {x: 0, y: 0}
    return {x: 0, y: 0}
}


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: scrollHandler
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
