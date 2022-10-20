import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from "@/views/MainView";
import ProfileView from "@/views/ProfileView";
import AccountTab from "@/components/Profile/AccountTab";
import ClassesTab from "@/components/Profile/ClassesTab";
import SpecialistsView from "@/views/SpecialistsView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    children: [
      {
        path: 'account',
        name: 'account',
        component: AccountTab
      },
      {
        path: 'account',
        name: 'account',
        component: ClassesTab
      }
    ]
  },
  {
    path: '/specialists',
    name: 'specialists',
    component: SpecialistsView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
