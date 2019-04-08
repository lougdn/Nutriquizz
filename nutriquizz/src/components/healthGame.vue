<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class='green--text'>NutriQuizz</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="movePage('login')" color='blue-grey'>Recommencer</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-progress-linear
        :value='nbQuestion'
        color='blue-grey darken-1'
        background-color='blue-grey lighten-4'
      ></v-progress-linear>
      <br>
      <v-alert :value='true' color='blue-grey' icon='null' class='text-md-center'>
        <h1>{{ login }}, quel est le meilleur produit pour ta santé ?</h1>
      </v-alert>
      <br>

      <v-layout row>
        <v-flex xs12 sm8 md16>
          <v-card class='tile' color='light'>
            <v-card-title class='font-weight-light justify-center'>
              <div @click='redirectComparison(code1,1)' class='text-xs-center'>
                <h2>{{ name1 }}</h2>
                <v-divider></v-divider>
                <br>
                <v-img
                  v-bind:src='image1'
                  contain
                  height='300px'
                  min:height='300px'
                  min
                  width='300px'
                  class='light'
                ></v-img>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm8 md16 offset-sm1 offset-xs1>
          <v-card class='tile' color='light'>
            <v-card-title class='font-weight-light justify-center'>
              <div @click='redirectComparison(code2,2)' class='text-xs-center'>
                <h2>{{ name2 }}</h2>
                <v-divider></v-divider>
                <br>
                <v-img
                  v-bind:src='image2'
                  contain
                  height='300px'
                  min:height='300px'
                  min
                  width='300px'
                  class='light'
                ></v-img>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    login: '',
    nbQuestion: 0,
    choix: 0,

    catego: [
      {
        viandes: [
          'steak+hache+pur',
          'jambon+blanc',
          'cordon+bleu',
          'lardon+herta',
          'knacki',
          'escalope+de+dinde+loue'
        ]
      },
      {
        biscuits: [
          'prince+choco',
          'biscuit+gerble',
          'galette+de+riz+gerble',
          'petit+ecolier',
          'napolitain+lu',
          'cookie+granola'
        ]
      },
      {
        poissons: [
          'saumon+fume+ecosse',
          'surimi+fleury+michon',
          'filet+de+maquereau',
          'sardine',
          'cabillaud+pane',
          'dos+de+cabillaud+surgele'
        ]
      },
      {
        cereales: [
          'muesli+jordans',
          'coco+pops',
          'tresor+kelloggs',
          'corn+flakes',
          'chocapic',
          'lion+cereales'
        ]
      },
      {
        bonbons: [
          'kinder+bueno',
          'krema',
          'ricola',
          'tagada',
          'malabar+tutti+frutti',
          'mentos'
        ]
      },
      {
        feculents: [
          'riz+basmati+taureau+aile',
          'coquillette+barilla',
          'quinoa+tipiak',
          'polenta+tipiak',
          'puree+mousline',
          'gnocchi+lustucru'
        ]
      },
      {
        fromages: [
          'kiri+a+la+creme+de+lait',
          'camembert',
          'fromage+de+chevre',
          'fromage+de+brebis',
          'chaussee+aux+moines',
          'ficello'
        ]
      },
      {
        boissons: [
          'eau',
          'coca',
          'jus+d+orange',
          'oasis',
          'ice+tea',
          'grandlait'
        ]
      },
      {
        sauces: [
          'sauce+ketchup',
          'mayonnaise+de+dijon',
          'moutarde+fine',
          'sauce+bearnaise',
          'sauce+barbecue',
          'coulis+tomates'
        ]
      },
      {
        tartines: [
          'nutella',
          'confiture+de+fraise',
          'gelee+de+cassis',
          'beurre+demi+sel',
          'skippy'
        ]
      }
    ],

    // toutes les informations sur le 1er element
    element1: '',
    product1: [],
    code1: '',
    image1: '',
    name1: '',

    // toutes les informations sur le 2e element
    element2: '',
    product2: [],
    code2: '',
    image2: '',
    name2: ''
  }),

  created () {
    this.login = this.$store.getters.getLogin
    // pour piocher au hasard deux elements d'une meme categorie, que l'on va pouvoir comparer
    this.getElement()
    var scope = this
    scope.nbQuestion = this.$store.getters.getNumberQuestion * 20

    // pour prendre les infos sur un 1er element depuis le back end
    axios
      .get('http://localhost:3000/products?search_terms=' + this.element1)
      .then(function (response) {
        var index = 0
        var p = response.data[index]
        var condition = 0

        // on vérifie que l'element a bien toutes les infos dont on a besoin, sinon, on en selectionne un autre
        while (condition === 0) {
          if (p.code === '' || p.image_url === '') {
            index += 1
            p = response.data[index]
          } else {
            condition = 1
          }
        }
        scope.product1 = p
        scope.code1 = p.code
        scope.image1 = p.image_url

        if (p.product_name !== '') {
          scope.name1 = p.product_name
        } else {
          scope.name1 = p.generic_name
        }
      })

    // pour prendre les infos sur un 2e element depuis le back end
    axios
      .get('http://localhost:3000/products?search_terms=' + this.element2)
      .then(function (response) {
        var index = 0
        var p = response.data[index]

        var condition = 0
        // on vérifie que l'element a bien toutes les infos dont on a besoin, sinon, on en selectionne un autre
        while (condition === 0) {
          if (p.code === '' || p.image_url === '') {
            index += 1
            p = response.data[index]
          } else {
            condition = 1
          }
        }
        scope.product2 = p
        scope.code2 = p.code
        scope.image2 = p.image_url

        if (p.product_name !== '') {
          scope.name2 = p.product_name
        } else {
          scope.name2 = p.generic_name
        }
      })
  },

  methods: {
    getElement () {
      // selectionner une categorie au hasard
      var randomIndex = Math.floor(Math.random() * this.catego.length)
      var randomCategory = this.catego[randomIndex]

      // selectionner un 1er element de la categorie au hasard
      var key = Object.keys(randomCategory)
      var randomIndexElement = Math.floor(
        Math.random() * randomCategory[key].length
      )
      var randomElement = randomCategory[key][randomIndexElement]
      this.element1 = randomElement

      // selectionner un 2e element de la categorie au hasard
      var key2 = Object.keys(randomCategory)
      var randomIndexElement2 = Math.floor(
        Math.random() * randomCategory[key2].length
      )
      var randomElement2 = randomCategory[key2][randomIndexElement2]

      // pour ne pas comparer 2 elements identiques
      if (randomElement2 === randomElement) {
        while (randomElement2 === randomElement) {
          key2 = Object.keys(randomCategory)
          randomIndexElement2 = Math.floor(
            Math.random() * randomCategory[key2].length
          )
          randomElement2 = randomCategory[key2][randomIndexElement2]
        }
      }
      this.element2 = randomElement2
    },

    redirectComparison (code, choice) {
      this.$store.commit('registerCode', {
        code1: this.code1,
        code2: this.code2
      })
      this.$store.commit('checkAnswer', { codeClicked: code })
      this.$store.commit('storeChoice', { choix: choice })
    }
  }
}
</script>

<style>
</style>
