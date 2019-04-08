<template>
  <div id='login'>
    <v-toolbar>
      <v-toolbar-title class='green--text'>NutriQuizz</v-toolbar-title>
    </v-toolbar>
    <v-container bg fill-height grid-list-md text-xs-center>
      <v-layout justify-center align-center>
        <v-flex xs2 sm8 md4>
          <v-card-text>
            <!-- On vérifie si on a des erreurs stockées -->
            <p v-if='errors.length'>
              <v-alert :value='true' color='blue-grey lighten-1' class='text-md-center'>
                <h2>
                  N'oublie pas de :
                  <li class='text-md-left' v-for='error in errors' :key='error'>{{ error }}</li>
                </h2>
              </v-alert>
            </p>
            <v-form @submit='checkForm'>
              <v-text-field v-model='Login' label='Nom' Login></v-text-field>
              <v-text-field v-model='Age' label='Age' type='number' Age></v-text-field>
              <v-btn type='submit' color='blue-grey' class='white--text'>Commencer à jouer</v-btn>
            </v-form>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    errors: [],
    Login: null,
    Age: null
  }),
  methods: {
    // Ajout des informations de l'utilisateur dans le store
    userUpdate () {
      this.$store.commit('authenticate', { login: this.Login, age: this.Age })
    },
    // Fonction de validation du formulaire
    checkForm: function (e) {
      if (this.Login && this.Age) {
        this.userUpdate ()
      }

      this.errors = []

      // Si le nom ou l'age n'est pas renseigné, on ajoute une erreur à la liste d'erreur
      if (!this.Login) {
        this.errors.push('Rentrer ton nom')
      }
      if (!this.Age || this.Age <= 0) {
        this.errors.push('Rentrer bien ton âge')
      }
      e.preventDefault()
    }
  },
  created() {
    if (this.$store.getters.getLogin !== '') {
      window.location.reload()
    }
  }
}
</script>
