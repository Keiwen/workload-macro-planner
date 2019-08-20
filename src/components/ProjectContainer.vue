<template>
    <div>
        <div class="project-container">
            <project v-for="project in projects" :key="project.id" :project="project"></project>
        </div>
        <div class="row">
            <div class="col-4">
                <button @click="back()" class="btn btn-info"><icon name="arrow-left" /> Back</button>
            </div>
            <div class="col-4">
            </div>
            <div class="col-4">
                <router-link :to="{ name: 'edit-project' }" class="btn btn-outline-primary">
                    <icon name="plus" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Project from './Project'

export default {
  name: 'project-container',
  components: {Project},
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['projects'])
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
