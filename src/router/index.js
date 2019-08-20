import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from '@/components/Mainpage'
import CardEdit from '@/components/CardEdit'
import ResourceEdit from '@/components/ResourceEdit'
import ResourceContainer from '@/components/ResourceContainer'
import ProjectEdit from '@/components/ProjectEdit'
import ProjectContainer from '@/components/ProjectContainer'
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
      component: CardEdit
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourceContainer
    },
    {
      path: '/edit-resource',
      name: 'edit-resource',
      component: ResourceEdit
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectContainer
    },
    {
      path: '/edit-project',
      name: 'edit-project',
      component: ProjectEdit
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
