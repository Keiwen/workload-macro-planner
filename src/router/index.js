import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from '@/components/Mainpage'
import EditCard from '@/components/EditCard'
import EditResource from '@/components/EditResource'
import ResourceContainer from '@/components/ResourceContainer'
import EditProject from '@/components/EditProject'
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
      path: '/projects',
      name: 'projects',
      component: ProjectContainer
    },
    {
      path: '/edit-project',
      name: 'edit-project',
      component: EditProject
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
