<template>
  <div class="edit-card container-fluid">

    <h2 v-if="card.id">Edit card</h2>
    <h2 v-else>Create card</h2>

    <div class="form-group row">
      <label for="newName" class="control-label col-4 col-md-2">Name:</label>
      <div class="input-group col-8 col-md-10">
        <input type="text" id="newName" class="form-control" maxlength="22"
               ref="inputCardName"
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
    <div class="form-group row">
      <card-color-pick @pick-color="pickColor" :current="card.color" />
    </div>

    <button @click="remove()" v-if="card.id" class="btn btn-danger"><icon name="trash" /> Remove</button>
    <button @click="cancelEdit()" class="btn btn-warning"><icon name="times" /> Cancel</button>
    <button @click="confirmEdit()" class="btn btn-success"><icon name="check" /> Save</button>


      <div class="project-move container-fluid" v-if="card.id">
          <hr/>
          <div class="form-group row">
              <label for="newProject" class="control-label col-4 col-md-2">Move to project:</label>
              <div class="input-group col-8 col-md-10">
                  <select id="newProject" class="form-control" v-model="newProject" @change="changeProject()">
                      <option v-for="project in projects" :value="project">{{ project.name }}</option>
                  </select>
              </div>
          </div>
      </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardColorPick from './CardColorPick'

export default {
  name: 'card-edit',
  components: { CardColorPick },
  data () {
    return {
      card: {},
      newProject: {}
    }
  },
  computed: {
    ...mapGetters(['getDefaultCard', 'cardColors', 'currentProject', 'projects'])
  },
  mounted () {
    this.card = this.$route.params.card
    if (!this.card) this.card = this.getDefaultCard()
    this.card = JSON.parse(JSON.stringify(this.card))
    this.newProject = this.currentProject
    if (!this.card.id) {
      // no focus on update, it will open keyboard and hide bottom screen
      this.$refs.inputCardName.focus()
    }
  },
  methods: {
    ...mapActions(['setCard', 'removeCard', 'moveCard']),
    confirmEdit () {
      this.setCard(this.card)
      this.$router.push({name: 'mainpage'})
    },
    cancelEdit () {
      this.$router.push({name: 'mainpage'})
    },
    remove () {
      this.removeCard(this.card.id)
      this.$router.push({name: 'mainpage'})
    },
    pickColor (pick) {
      this.card.color = pick
    },
    changeProject () {
      this.moveCard({toProjectId: this.newProject.id, card: this.card})
      this.$router.push({name: 'mainpage'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .project-move {
        margin-top: 50px;
    }
</style>
