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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'settings',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['getDefaultResource', 'getDefaultCard'])
  },
  methods: {
    ...mapActions(['setCard', 'setResource']),
    devData () {
      let resource = {}
      resource = this.getDefaultResource()
      resource.name = 'Paul'; resource.capacity = 10
      this.setResource(resource)
      resource = this.getDefaultResource()
      resource.name = 'Arthur'; resource.capacity = 15
      this.setResource(resource)

      let card = {}
      card = this.getDefaultCard()
      card.name = 'For Emily'; card.workload = 10
      this.setCard(card)
      card = this.getDefaultCard()
      card.name = 'The Boxer'; card.workload = 5
      this.setCard(card)
      card = this.getDefaultCard()
      card.name = 'Scarborough Fair'; card.workload = 3
      this.setCard(card)

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
