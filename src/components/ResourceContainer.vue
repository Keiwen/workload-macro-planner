<template>
    <div>
        <div class="resource-container">
            <resource v-for="resource in resources" :key="resource.id" :resource="resource"></resource>
        </div>
        <div class="row">
            <div class="col-4">
                <button @click="back()" class="btn btn-info"><icon name="arrow-left" /> Back</button>
            </div>
            <div class="col-4">
            </div>
            <div class="col-4">
                <router-link :to="{ name: 'edit-resource' }" class="btn btn-outline-primary">
                    <icon name="plus" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Resource from './Resource'

export default {
  name: 'resource-container',
  components: {Resource},
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['resources'])
  },
  methods: {
    back () {
      this.$router.push({name: 'mainpage'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
