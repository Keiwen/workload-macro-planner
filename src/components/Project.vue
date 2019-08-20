<template>
  <div class="project col-sm-6">
      <div class="row">
          <div class="col-10">
              {{project.name}}
          </div>
          <div class="col-2">
              <router-link :to="{ name: 'edit-project', params: {project: project} }" class="btn btn-outline-primary">
                  <icon name="pencil-alt" />
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'project',
  props: ['project'],
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
