<template>
  <div class="edit-resource container-fluid">

    <h2 v-if="resource.id">Edit resource</h2>
    <h2 v-else>Create resource</h2>

    <div class="form-group row">
      <label for="newName" class="control-label col-4 col-md-2">Name:</label>
      <div class="input-group col-8 col-md-10">
        <input type="text" id="newName" class="form-control"
               v-model="resource.name" @keyup.enter="confirmEdit()"/>
      </div>
    </div>
    <div class="form-group row">
      <label for="newCapacity" class="control-label col-4 col-md-2">Capacity:</label>
      <div class="input-group col-8 col-md-10">
        <input type="number" id="newCapacity" class="form-control"
               v-model="resource.capacity" @keyup.enter="confirmEdit()"/>
      </div>
    </div>

    <button @click="remove()" v-if="resource.id" class="btn btn-danger"><icon name="trash" /> Remove</button>
    <button @click="cancelEdit()" class="btn btn-warning"><icon name="times" /> Cancel</button>
    <button @click="confirmEdit()" class="btn btn-success"><icon name="check" /> Save</button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'edit-resource',
  components: {},
  data () {
    return {
      resource: {}
    }
  },
  computed: {
    ...mapGetters(['getDefaultResource'])
  },
  mounted () {
    this.resource = this.$route.params.resource
    if (!this.resource) this.resource = this.getDefaultResource()
    this.resource = JSON.parse(JSON.stringify(this.resource))
  },
  methods: {
    ...mapActions(['setResource', 'removeResource']),
    confirmEdit () {
      this.setResource(this.resource)
      this.$router.push({name: 'resources'})
    },
    cancelEdit () {
      this.$router.push({name: 'resources'})
    },
    remove () {
      this.removeResource(this.resource.id)
      this.$router.push({name: 'resources'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
