<template>
  <div class="edit-card container-fluid">

    <h2 v-if="card.id">Edit card</h2>
    <h2 v-else>Create card</h2>

    <div class="form-group row">
      <label for="newName" class="control-label col-4 col-md-2">Name:</label>
      <div class="input-group col-8 col-md-10">
        <input type="text" id="newName" class="form-control" maxlength="30"
               v-model="card.name" @keyup.enter="confirmEdit()"/>
      </div>
    </div>
    <div class="form-group row">
      <label for="newWorkload" class="control-label col-4 col-md-2">Workload:</label>
      <div class="input-group col-8 col-md-10">
        <input type="number" id="newWorkload" class="form-control"
               v-model="card.workload" @keyup.enter="confirmEdit()"/>
      </div>
    </div>

    <button @click="remove()" class="btn btn-danger"><icon name="trash" /> Remove</button>
    <button @click="cancelEdit()" class="btn btn-warning"><icon name="times" /> Cancel</button>
    <button @click="confirmEdit()" class="btn btn-success"><icon name="check" /> Save</button>

  </div>
</template>

<script>
import * as storeMut from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  name: 'edit-card',
  components: {},
  data () {
    return {
      card: {}
    }
  },
  computed: {
    ...mapGetters(['getDefaultCard'])
  },
  mounted () {
    this.card = this.$route.params.card
    if (!this.card) this.card = this.getDefaultCard()
    this.card = JSON.parse(JSON.stringify(this.card))
  },
  methods: {
    confirmEdit () {
      this.$store.commit(storeMut.SET_CARD, this.card)
      this.$router.push({name: 'mainpage'})
    },
    cancelEdit () {
      this.$router.push({name: 'mainpage'})
    },
    remove () {
      this.$store.commit(storeMut.REMOVE_CARD, this.card.id)
      this.$router.push({name: 'mainpage'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
