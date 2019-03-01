import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from '@/components/Mainpage'
import EditCard from '@/components/EditCard'
import EditResource from '@/components/EditResource'
import ResourceContainer from '@/components/ResourceContainer'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainpage',
      component: Mainpage
    },
    {
      path: '/edit-card',
      name: 'edit-card',
      component: EditCard
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourceContainer
    },
    {
      path: '/edit-resource',
      name: 'edit-resource',
      component: EditResource
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
