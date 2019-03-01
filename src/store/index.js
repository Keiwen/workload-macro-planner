import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '../../node_modules/vuex/dist/logger'
import * as types from './mutation-types'
// import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// const persistOptions = {
//   key: 'keiwen-wmp'
// }

const defaultCard = {
  id: 0,
  name: '',
  workload: 0
}

const defaultResource = {
  id: 0,
  name: '',
  capacity: 0
}

const defaultProject = {
  id: 0,
  name: 'Project',
  nextCardId: 1,
  lastCardChanged: 0,
  cards: [],
  nextResourceId: 1,
  lastResourceChanged: 0,
  resources: []
}

export default new Vuex.Store({
  state: {
    nextProjectId: 1,
    lastProjectChanged: 0,
    currentProjectId: 0,
    projects: [
      JSON.parse(JSON.stringify(defaultProject))
    ]
  },
  getters: {
    projects: state => state.projects,
    getDefaultProjects: state => () => JSON.parse(JSON.stringify(defaultProject)),
    currentProject: state => {
      let list = state.projects.filter(project => { return project['id'] === state.currentProjectId })
      if (list.length > 0) return list[0]
      return {}
    },
    cards: (state, getters) => getters.currentProject.cards,
    getDefaultCard: state => () => JSON.parse(JSON.stringify(defaultCard)),
    resources: (state, getters) => getters.currentProject.resources,
    getDefaultResource: state => () => JSON.parse(JSON.stringify(defaultResource))
  },
  mutations: {
    [types.SET_CARD] (state, cardData) {
      if (cardData.id === undefined) cardData.id = 0
      let projectIndex = -1
      state.projects.forEach((project, index) => {
        if (project.id === state.currentProjectId) {
          projectIndex = index
        }
      })
      if (projectIndex < 0) return
      let currentProject = state.projects[projectIndex]
      let cardIndex = -1
      currentProject.cards.forEach((card, index) => {
        if (card.id === cardData.id) {
          cardIndex = index
        }
      })
      cardData.workload = parseInt(cardData.workload)

      if (cardIndex >= 0) {
        // update
        currentProject.cards[cardIndex] = cardData
      } else {
        // create
        cardData.id = currentProject.nextCardId
        currentProject.nextCardId++
        currentProject.cards.push(cardData)
      }
      currentProject.lastCardChanged = cardData.id
    },
    [types.REMOVE_CARD] (state, id) {
      let projectIndex = -1
      state.projects.forEach((project, index) => {
        if (project.id === state.currentProjectId) {
          projectIndex = index
        }
      })
      if (projectIndex < 0) return
      let currentProject = state.projects[projectIndex]
      currentProject.cards.forEach((card, index, array) => {
        if (card.id === id) {
          array.splice(index, 1)
        }
      })
      currentProject.lastDeckChanged = id
    },
    [types.REORDER_CARDS] (state, reorderedCards) {
      let projectIndex = -1
      state.projects.forEach((project, index) => {
        if (project.id === state.currentProjectId) {
          projectIndex = index
        }
      })
      if (projectIndex < 0) return
      let currentProject = state.projects[projectIndex]
      currentProject.cards = reorderedCards
    },

    [types.SET_RESOURCE] (state, resourceData) {
      if (resourceData.id === undefined) resourceData.id = 0
      let projectIndex = -1
      state.projects.forEach((project, index) => {
        if (project.id === state.currentProjectId) {
          projectIndex = index
        }
      })
      if (projectIndex < 0) return
      let currentProject = state.projects[projectIndex]
      let resourceIndex = -1
      currentProject.resources.forEach((resource, index) => {
        if (resource.id === resourceData.id) {
          resourceIndex = index
        }
      })
      resourceData.capacity = parseInt(resourceData.capacity)

      if (resourceIndex >= 0) {
        // update
        currentProject.resources[resourceIndex] = resourceData
      } else {
        // create
        resourceData.id = currentProject.nextResourceId
        currentProject.nextResourceId++
        currentProject.resources.push(resourceData)
      }
      currentProject.lastResourceChanged = resourceData.id
    },
    [types.REMOVE_RESOURCE] (state, id) {
      let projectIndex = -1
      state.projects.forEach((project, index) => {
        if (project.id === state.currentProjectId) {
          projectIndex = index
        }
      })
      if (projectIndex < 0) return
      let currentProject = state.projects[projectIndex]
      currentProject.resources.forEach((resource, index, array) => {
        if (resource.id === id) {
          array.splice(index, 1)
        }
      })
      currentProject.lastResourceChanged = id
    }
  },
  strict: debug,
  // plugins: debug ? [createLogger(), persistedState(persistOptions)] : [persistedState(persistOptions)]
  plugins: debug ? [createLogger()] : []
})
