<template>
  <div class="card-container container">
      <draggable v-model="cards" :options="{animation: 150, handle: '.ddHandle'}">
        <card v-for="card in cards" :key="card.id" :card="card"></card>
      </draggable>
  </div>
</template>

<script>
import * as storeMut from '@/store/mutation-types'
import Card from './Card'

export default {
  name: 'card-container',
  components: {Card},
  data () {
    return {}
  },
  computed: {
    cards: {
      get () {
        return this.$store.getters.currentProject.cards
      },
      set (reorderedCards) {
        this.$store.commit(storeMut.REORDER_CARDS, reorderedCards)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
