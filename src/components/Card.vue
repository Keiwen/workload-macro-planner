<template>
  <div class="card col-sm-6 text-center">
      <div class="row">
          <div class="col-3">
              <div class="card-side ddHandle btn btn-outline-primary">
                  <icon name="arrows-alt" scale="1.5" />
              </div>
          </div>
          <div class="col-6 card-body">
              <p>{{card.name}}</p>
          </div>
          <div class="col-3">
              <router-link :to="{ name: 'edit-card', params: {card: card} }"
                           class="card-side card-workload btn btn-outline-primary">
                  {{card.workload}}
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>
// import * as storeMut from '@/store/mutation-types'

export default {
  name: 'card',
  props: ['card'],
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .card {
        margin-bottom: 5px;
        border-radius: 25px;
        height: 55px;
        .card-side {
            width: 55px;
            height: 55px;
            border-radius: 25px;
            &.ddHandle svg {
                margin-top: 7px;
            }
        }
        .card-body {
            padding: 0 5px;
        }
    }
</style>
