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
  name: '',
  nextCardId: 1,
  lastCardChanged: 0,
  cards: [],
  nextResourceId: 1,
  lastResourceChanged: 0,
  resources: []
}

let firstProject = JSON.parse(JSON.stringify(defaultProject))
firstProject.id = 1
firstProject.name = 'Project'

export default new Vuex.Store({
  state: {
    nextProjectId: 2,
    lastProjectChanged: 0,
    currentProjectId: 1,
    projects: [
      JSON.parse(JSON.stringify(firstProject))
    ]
  },
  getters: {
    projects: state => state.projects,
    getDefaultProject: state => () => JSON.parse(JSON.stringify(defaultProject)),
    getProjectIndex: state => (projectId) => {
      if (typeof projectId === 'undefined') projectId = state.currentProjectId
      for (let i = 0; i < state.projects.length; i++) {
        const project = state.projects[i]
        if (project.id === projectId) {
          return i
        }
      }
      return -1
    },
    getProject: (state, getters) => (projectId) => {
      if (typeof projectId === 'undefined') projectId = state.currentProjectId
      let projectIndex = getters.getProjectIndex(projectId)
      if (projectIndex < 0) return {}
      return state.projects[projectIndex]
    },
    currentProject: (state, getters) => getters.getProject(),
    cards: (state, getters) => getters.currentProject.cards,
    getDefaultCard: state => () => JSON.parse(JSON.stringify(defaultCard)),
    getCardIndex: (state, getters) => (cardId, projectId) => {
      if (typeof projectId === 'undefined') projectId = state.currentProjectId
      let project = getters.getProject(projectId)
      if (typeof project.id === 'undefined') return -1
      for (let i = 0; i < project.cards.length; i++) {
        const card = project.cards[i]
        if (card.id === cardId) {
          return i
        }
      }
      return -1
    },
    getCard: (state, getters) => (cardId, projectId) => {
      if (typeof projectId === 'undefined') projectId = state.currentProjectId
      let cardIndex = getters.getCardIndex(cardId, projectId)
      if (cardIndex < 0) return {}
      let project = getters.getProject(projectId)
      return project.cards[cardIndex]
    },
    resources: (state, getters) => getters.currentProject.resources,
    getDefaultResource: state => () => JSON.parse(JSON.stringify(defaultResource)),
    getResourceIndex: (state, getters) => (resourceId, projectId) => {
      if (typeof projectId === 'undefined') projectId = state.currentProjectId
      let project = getters.getProject(projectId)
      if (typeof project.id === 'undefined') return -1
      for (let i = 0; i < project.resources.length; i++) {
        const resource = project.resources[i]
        if (resource.id === resourceId) {
          return i
        }
      }
      return -1
    },
    getResource: (state, getters) => (resourceId, projectId) => {
      if (typeof projectId === 'undefined') projectId = state.currentProjectId
      let resourceIndex = getters.getResourceIndex(resourceId, projectId)
      if (resourceIndex < 0) return {}
      let project = getters.getProject(projectId)
      return project.resources[resourceIndex]
    }
  },
  actions: {
    setCard ({getters, commit}, cardData) {
      // be sure to have id
      if (cardData.id === undefined) cardData.id = 0
      let projectIndex = getters.getProjectIndex()
      if (projectIndex < 0) return
      let cardIndex = getters.getCardIndex(cardData.id)
      // be sure to have int in workload
      cardData.workload = parseInt(cardData.workload)

      commit(types.SET_CARD, {cardData: cardData, cardIndex: cardIndex, projectIndex: projectIndex})
    },
    removeCard ({getters, commit}, cardId) {
      let projectIndex = getters.getProjectIndex()
      if (projectIndex < 0) return
      let cardIndex = getters.getCardIndex(cardId)

      commit(types.REMOVE_CARD, {cardId: cardId, cardIndex: cardIndex, projectIndex: projectIndex})
    },
    reorderCard ({getters, commit}, cards) {
      let projectIndex = getters.getProjectIndex()
      if (projectIndex < 0) return

      commit(types.CHANGE_CARDS, {cards: cards, projectIndex: projectIndex})
    },
    setResource ({getters, commit}, resourceData) {
      // be sure to have id
      if (resourceData.id === undefined) resourceData.id = 0
      let projectIndex = getters.getProjectIndex()
      if (projectIndex < 0) return
      let resourceIndex = getters.getResourceIndex(resourceData.id)
      // be sure to have int in capacity
      resourceData.capacity = parseInt(resourceData.capacity)

      commit(types.SET_RESOURCE, {resourceData: resourceData, resourceIndex: resourceIndex, projectIndex: projectIndex})
    },
    removeResource ({getters, commit}, resourceId) {
      let projectIndex = getters.getProjectIndex()
      if (projectIndex < 0) return
      let resourceIndex = getters.getResourceIndex(resourceId)

      commit(types.REMOVE_RESOURCE, {resourceId: resourceId, resourceIndex: resourceIndex, projectIndex: projectIndex})
    },
    setProject ({getters, commit}, projectData) {
      // be sure to have id
      if (projectData.id === undefined) projectData.id = 0
      let projectIndex = getters.getProjectIndex(projectData.id)

      commit(types.SET_PROJECT, {projectData: projectData, projectIndex: projectIndex})
    },
    removeProject ({getters, commit}, projectId) {
      let projectIndex = getters.getProjectIndex(projectId)

      commit(types.REMOVE_PROJECT, {projectId: projectId, projectIndex: projectIndex})
    }
  },
  mutations: {
    [types.SET_CARD] (state, payload) {
      let project = state.projects[payload.projectIndex]
      if (payload.cardIndex >= 0) {
        // update
        project.cards[payload.cardIndex] = payload.cardData
      } else {
        // create
        payload.cardData.id = project.nextCardId
        project.nextCardId++
        project.cards.push(payload.cardData)
      }
      project.lastCardChanged = payload.cardData.id
    },
    [types.REMOVE_CARD] (state, payload) {
      let project = state.projects[payload.projectIndex]
      project.cards.splice(payload.cardIndex, 1)
      project.lastCardChanged = payload.cardId
    },
    [types.CHANGE_CARDS] (state, payload) {
      let project = state.projects[payload.projectIndex]
      project.cards = payload.cards
    },

    [types.SET_RESOURCE] (state, payload) {
      let project = state.projects[payload.projectIndex]
      if (payload.resourceIndex >= 0) {
        // update
        project.resources[payload.resourceIndex] = payload.resourceData
      } else {
        // create
        payload.resourceData.id = project.nextResourceId
        project.nextResourceId++
        project.resources.push(payload.resourceData)
      }
      project.lastResourceChanged = payload.resourceData.id
    },
    [types.REMOVE_RESOURCE] (state, payload) {
      let project = state.projects[payload.projectIndex]
      project.resources.splice(payload.resourceIndex, 1)
      project.lastResourceChanged = payload.resourceId
    },

    [types.SET_PROJECT] (state, payload) {
      if (payload.projectIndex >= 0) {
        // update
        state.projects[payload.projectIndex].name = payload.projectData.name
        state.lastProjectChanged = payload.projectData.id
      } else {
        // create
        let project = JSON.parse(JSON.stringify(defaultProject))
        project.name = payload.projectData.name
        project.id = state.nextProjectId
        state.nextProjectId++
        state.projects.push(project)
        // new project set as current
        state.currentProjectId = project.id
        state.lastProjectChanged = project.id
      }
    },
    [types.REMOVE_PROJECT] (state, payload) {
      state.projects.splice(payload.projectIndex, 1)
      // if removed is the current one, set back the first project
      if (state.currentProjectId === payload.projectId) {
        state.currentProjectId = 1
      }
      state.lastProjectChanged = payload.projectId
    }
  },
  strict: debug,
  // plugins: debug ? [createLogger(), persistedState(persistOptions)] : [persistedState(persistOptions)]
  plugins: debug ? [createLogger()] : []
})
