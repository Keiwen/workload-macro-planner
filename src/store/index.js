import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '../../node_modules/vuex/dist/logger'
import * as types from './mutation-types'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const persistOptions = {
  key: 'keiwen-wmp'
}

const cardColors = [
  '#FFFFFF',
  '#F3958D',
  '#FCCE48',
  '#FFF79A',
  '#D9FFAE',
  '#BFFFF0',
  '#CFF1F8',
  '#CBDDFB',
  '#E5CBFC',
  '#FDE0F0',
  '#EFDCC7',
  '#EAEBEE'
]

const defaultCard = {
  id: 0,
  name: '',
  color: cardColors[0],
  workload: 0,
  out: false
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
  order: 0,
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
    cardColors: state => cardColors,
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
    switchCardInOut ({getters, commit}, cardId) {
      let projectIndex = getters.getProjectIndex()
      if (projectIndex < 0) return
      let cardIndex = getters.getCardIndex(cardId)

      commit(types.SWITCH_CARD, {cardId: cardId, cardIndex: cardIndex, projectIndex: projectIndex})
    },
    removeCard ({getters, commit}, cardId) {
      let projectIndex = getters.getProjectIndex()
      if (projectIndex < 0) return
      let cardIndex = getters.getCardIndex(cardId)

      commit(types.REMOVE_CARD, {cardIndex: cardIndex, projectIndex: projectIndex})
    },
    reorderCard ({getters, commit}, cards) {
      let projectIndex = getters.getProjectIndex()
      if (projectIndex < 0) return

      commit(types.CHANGE_CARDS, {cards: cards, projectIndex: projectIndex, order: 0})
    },
    orderCardsBy ({getters, commit}, order) {
      let projectIndex = getters.getProjectIndex()
      if (projectIndex < 0) return
      let cards = JSON.parse(JSON.stringify(getters.cards))

      cards.sort((cardA, cardB) => {
        switch (order) {
          case 'workload':
            return cardB.workload - cardA.workload
          case 'color':
            return cardColors.indexOf(cardA.color) - cardColors.indexOf(cardB.color)
          default:
            order = 'alpha'
            if (cardB.name.toLowerCase() > cardA.name.toLowerCase()) return -1
            return 1
        }
      })
      commit(types.CHANGE_CARDS, {cards: cards, projectIndex: projectIndex, order: order})
    },
    orderCardsSwitch ({getters, dispatch}) {
      const currentOrder = getters.currentProject.order
      let newOrder = 'alpha'
      switch (currentOrder) {
        case 'alpha':
          newOrder = 'workload'
          break
        case 'workload':
          newOrder = 'color'
          break
      }
      dispatch('orderCardsBy', newOrder)
    },
    moveCard ({getters, commit}, payload) {
      // be sure to have id
      if (payload.card.id === undefined) return
      let fromProjectIndex = getters.getProjectIndex()
      let toProjectIndex = getters.getProjectIndex(payload.toProjectId)
      if (fromProjectIndex < 0 || toProjectIndex < 0) return
      let cardIndex = getters.getCardIndex(payload.card.id)
      // be sure to have int in workload
      payload.card.workload = parseInt(payload.card.workload)

      commit(types.SET_CARD, {cardData: payload.card, cardIndex: -1, projectIndex: toProjectIndex})
      commit(types.REMOVE_CARD, {cardIndex: cardIndex, projectIndex: fromProjectIndex})
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
    },
    pickProject ({getters, commit}, projectId) {
      let projectIndex = getters.getProjectIndex(projectId)
      if (projectIndex < 0) return

      commit(types.PICK_PROJECT, projectId)
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
      project.order = 0
      project.lastCardChanged = payload.cardData.id
    },
    [types.SWITCH_CARD] (state, payload) {
      let project = state.projects[payload.projectIndex]
      project.cards[payload.cardIndex].out = !project.cards[payload.cardIndex].out
      project.lastCardChanged = payload.cardId
    },
    [types.REMOVE_CARD] (state, payload) {
      let project = state.projects[payload.projectIndex]
      project.cards.splice(payload.cardIndex, 1)
      project.lastCardChanged = 0
    },
    [types.CHANGE_CARDS] (state, payload) {
      let project = state.projects[payload.projectIndex]
      project.cards = payload.cards
      project.order = payload.order
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
    },
    [types.PICK_PROJECT] (state, projectId) {
      state.currentProjectId = projectId
    }
  },
  strict: debug,
  plugins: debug ? [createLogger(), persistedState(persistOptions)] : [persistedState(persistOptions)]
})
