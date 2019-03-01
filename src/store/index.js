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

export default new Vuex.Store({
  state: {
    nextCardId: 1,
    lastCardChanged: 0,
    cards: [
    ],
    nextResourceId: 1,
    lastResourceChanged: 0,
    resources: [
    ]
  },
  getters: {
    cards: state => state.cards,
    getDefaultCard: state => () => JSON.parse(JSON.stringify(defaultCard)),
    resources: state => state.resources,
    getDefaultResource: state => () => JSON.parse(JSON.stringify(defaultResource))
  },
  mutations: {
    [types.SET_CARD] (state, cardData) {
      if (cardData.id === undefined) cardData.id = 0
      let cardIndex = -1
      state.cards.forEach((card, index) => {
        if (card.id === cardData.id) {
          cardIndex = index
        }
      })
      cardData.workload = parseInt(cardData.workload)

      if (cardIndex >= 0) {
        // update
        state.cards[cardIndex] = cardData
      } else {
        // create
        cardData.id = state.nextCardId
        state.nextCardId++
        state.cards.push(cardData)
      }
      state.lastCardChanged = cardData.id
    },
    [types.REMOVE_CARD] (state, id) {
      state.cards.forEach((card, index, array) => {
        if (card.id === id) {
          array.splice(index, 1)
        }
      })
      state.lastDeckChanged = id
    },
    [types.REORDER_CARDS] (state, reorderedCards) {
      state.cards = reorderedCards
    },

    [types.SET_RESOURCE] (state, resourceData) {
      if (resourceData.id === undefined) resourceData.id = 0
      let resourceIndex = -1
      state.resources.forEach((resource, index) => {
        if (resource.id === resourceData.id) {
          resourceIndex = index
        }
      })
      resourceData.capacity = parseInt(resourceData.capacity)

      if (resourceIndex >= 0) {
        // update
        state.resources[resourceIndex] = resourceData
      } else {
        // create
        resourceData.id = state.nextResourceId
        state.nextResourceId++
        state.resources.push(resourceData)
      }
      state.lastResourceChanged = resourceData.id
    },
    [types.REMOVE_RESOURCE] (state, id) {
      state.resources.forEach((resource, index, array) => {
        if (resource.id === id) {
          array.splice(index, 1)
        }
      })
      state.lastResourceChanged = id
    }
  },
  strict: debug,
  // plugins: debug ? [createLogger(), persistedState(persistOptions)] : [persistedState(persistOptions)]
  plugins: debug ? [createLogger()] : []
})
