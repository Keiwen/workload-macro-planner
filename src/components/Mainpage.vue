<template>
  <div class="main">
    <header class="fixed-top">
      <workload></workload>
    </header>
    <div class="content">
      <card-container></card-container>
    </div>
    <footer class="fixed-bottom">
      <div class="row">
        <!--
        <div class="col-2">
          <router-link :to="{ name: 'settings' }" class="btn btn-primary btn-main btn-main-settings">
            <icon name="cog" scale="2"/>
          </router-link>
        </div>
        -->
        <div class="col-2">
          <router-link :to="{ name: 'resources' }" class="btn btn-primary btn-main btn-main-resources">
            <icon name="users" scale="2"/>
          </router-link>
        </div>
        <div class="col-5">
          <router-link :to="{ name: 'projects' }" class="main-project vertical-align">
            {{ currentProject.name }}
          </router-link>
        </div>
        <div class="col-3">
          <button @click="orderCardsSwitch()" class="btn btn-dark btn-main btn-main-order">
            <icon v-if="currentProject.order == 'alpha'" name="sort-alpha-down" scale="2"/>
            <icon v-if="currentProject.order == 'workload'" name="sort-numeric-down-alt" scale="2"/>
            <icon v-if="currentProject.order == 'color'" name="sort-amount-down-alt" scale="2"/>
            <icon v-if="currentProject.order == 0" name="sort" scale="2"/>
          </button>
        </div>
        <div class="col-2">
          <router-link :to="{ name: 'edit-card' }" class="btn btn-primary btn-main btn-main-add">
            <icon name="plus" scale="2"/>
          </router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Workload from './Workload'
import CardContainer from './CardContainer'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'mainpage',
  components: {Workload, CardContainer},
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['currentProject'])
  },
  methods: {
    ...mapActions(['orderCardsSwitch'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  header {
    height: 50px;
    background-color: white;
  }
  footer {
    height: 70px;
    padding-top: 10px;
    background-color: white;
  }
  .content {
    margin-top: 60px;
    margin-bottom: 80px;
  }

  .btn-main {
    border-radius: 25px;
    width: 50px;
    height: 50px;
    line-height: 34px;
    &.btn-main-add {
      margin-left: -17px;
    }
    &.btn-main-add svg {
      margin-left: -2px;
    }
    &.btn-main-settings svg {
      margin-left: -4px;
    }
    &.btn-main-resources svg {
      margin-left: -3px;
    }
  }

  .vertical-align {
      display: flex;
      flex-direction: column;
      justify-content: center;
  }

  .main-project {
    padding: 2px 0;
    height: 50px;
  }
</style>
