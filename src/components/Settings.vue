<template>
    <div>
        <button @click="devData()" class="btn btn-warning"><icon name="flask" /> Add dev data</button>
        <div class="row">
            <div class="col-4">
                <button @click="back()" class="btn btn-info"><icon name="arrow-left" /> Back</button>
            </div>
            <div class="col-8">
            </div>
        </div>
    </div>
</template>

<script>
import * as storeMut from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  name: 'settings',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['getDefaultResource', 'getDefaultCard'])
  },
  methods: {
    devData () {
      let resource = {}
      resource = this.getDefaultResource()
      resource.name = 'Paul'; resource.capacity = 10
      this.$store.commit(storeMut.SET_RESOURCE, resource)
      resource = this.getDefaultResource()
      resource.name = 'Arthur'; resource.capacity = 15
      this.$store.commit(storeMut.SET_RESOURCE, resource)

      let card = {}
      card = this.getDefaultCard()
      card.name = 'For Emily'; card.workload = 10
      this.$store.commit(storeMut.SET_CARD, card)
      card = this.getDefaultCard()
      card.name = 'The Boxer'; card.workload = 5
      this.$store.commit(storeMut.SET_CARD, card)
      card = this.getDefaultCard()
      card.name = 'Scarborough Fair'; card.workload = 3
      this.$store.commit(storeMut.SET_CARD, card)

      this.$router.push({name: 'mainpage'})
    },
    back () {
      this.$router.push({name: 'mainpage'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
