import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Authors from '@/views/Authors'
import AllQuotes from '@/views/AllQuotes'
import FavouriteQuotes from '@/views/FavouriteQuotes'
import MyQuotes from '@/views/MyQuotes'
import Settings from '@/views/Settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/authors',
      name: 'authors',
      component: Authors
    },
    {
      path: '/all-quotes',
      name: 'AllQuotes',
      component: AllQuotes
    },
    {
      path: '/favourite-quotes',
      name: 'FavouriteQuotes',
      component: FavouriteQuotes
    },
    {
      path: '/my-quotes',
      name: 'MyQuotes',
      component: MyQuotes
    },
  ]
})
