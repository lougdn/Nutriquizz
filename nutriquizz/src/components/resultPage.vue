<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class='green--text'>NutriQuizz</v-toolbar-title>
    </v-toolbar>
    <v-container bg fill-height grid-list-md text-xs-center>
      <v-layout justify-center align-center>
        <v-flex xs2 sm8 md4>
          <v-card-text>
            <v-alert :value='true' color='blue-grey lighten-1' class='text-md-center'>
              <h2>{{login}}, ton score est de {{score}} / 5</h2>
            </v-alert>
          </v-card-text>
          <v-btn
            @click="movePage('login')"
            color='blue-grey'
            class='white--text'
          >Changer de joueur</v-btn>
          <v-btn
            @click="PlayAgain('healthgame')"
            color='blue-grey'
            class='white--text'
          >Rejouer</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    login: null,
    Age: null,
    score: 0
  }),

  created () {
    this.login = this.$store.getters.getLogin
    this.score = this.$store.getters.getScore
  },

  methods: {
    movePage (path) {
      this.$router.push(path)
    },
    PlayAgain (path) {
      this.$store.commit('resetNbQuestion')
      this.$router.push(path)
    }
  }
}
</script>
