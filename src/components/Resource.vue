<template>
  <div class="resource col-sm-6">
      <div class="row">
          <div class="col-8">
              {{resource.name}}
          </div>
          <div class="col-2">
              {{resource.capacity}}
          </div>
          <div class="col-2">
              <router-link :to="{ name: 'edit-resource', params: {resource: resource} }" class="btn btn-outline-primary">
                  <icon name="pencil-alt" />
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'resource',
  props: ['resource'],
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
