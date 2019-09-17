<template>
  <div class="workload">
    <b-progress :max="progressSize">
      <b-progress-bar :variant="workloadVariant" :value="acceptableLoad" ></b-progress-bar>
      <b-progress-bar variant="danger" :value="overload" animated v-if="overload"></b-progress-bar>
    </b-progress>
    <span>{{totalWorkload}} / {{totalCapacity}}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'workload',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['resources', 'cards']),
    totalCapacity () {
      return this.resources.reduce((total, resource) => {
        return total + resource.capacity
      }, 0)
    },
    totalWorkload () {
      return this.cards.reduce((total, card) => {
        if (card.out) {
          return total
        }
        return total + card.workload
      }, 0)
    },
    progressSize () {
      return Math.max(this.totalCapacity, this.totalWorkload)
    },
    overload () {
      if (this.totalWorkload > this.totalCapacity) return this.totalWorkload - this.totalCapacity
      return 0
    },
    acceptableLoad () {
      if (this.overload) return this.totalCapacity
      return this.totalWorkload
    },
    workloadVariant () {
      return 'primary'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
