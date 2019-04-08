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
      <v-layout row>
        <v-flex grow pa-1>
          <div v-if='correctAnswer === true'>
            <v-alert :value='true' type='success'>{{ nameAnswered }} : bonne réponse !</v-alert>
          </div>
          <div v-else>
            <v-alert :value='true' type='error'>{{ nameAnswered }} : mauvaise réponse...</v-alert>
          </div>
        </v-flex>
        <v-flex shrink pa-1>
          <div v-if='questionAnswered < 4'>
            <v-btn
              @click='nextQuestion'
              large
              class='btn-suivant white--text'
              color='blue-grey'
              light
            >
              Question
              <br>Suivante
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              @click='nextQuestion'
              large
              class='btn-suivant white--text'
              color='blue-grey'
              light
            >
              Voir les
              <br>résultats
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <br>

      <v-layout row>
        <v-flex xs12 sm6 md16 lg8 xl8>
          <div class='card tile' v-bind:class="[!product1IsGood ? goodProduct : '', badProduct]">
            <v-card-title class='font-weight-light' v-if='product1.name'>
              <div class='headline font-weight-light tile-title'>
                <div v-if='product1.name.length<20'>{{ product1.name }}</div>
                <div v-else>{{ product1.name.substring(0,20)+'...' }}</div>
              </div>
            </v-card-title>
            <v-img v-bind:src='product1.picture' contain max-height='200px' class='grey lighten-4'></v-img>
            <v-list two-line>
              <v-tooltip top color='black'>
                <template v-slot:activator='{ on }'>
                  <v-list-tile v-on:click='additifsDetails' v-on='on'>
                    <v-list-tile-title>Additifs</v-list-tile-title>
                    <v-list-tile-content>
                      <v-list-tile-action>
                        <v-avatar v-bind:color='color1' size='40'>
                          <span class='white--text headline'>{{ product1.additives }}</span>
                        </v-avatar>
                      </v-list-tile-action>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <div class='desc'>
                  Les
                  <b>additifs</b> alimentaires sont des produits permettant
                  d'améliorer le goût, l'aspect visuel ou encore la conservation
                  de l'aliment. Certains d'entre eux sont mauvais et même dangereux
                  pour la santé !
                </div>
              </v-tooltip>
              <v-tooltip top color='black'>
                <template v-slot:activator='{ on }'>
                  <v-list-tile v-on:click='novaDetails' v-on='on'>
                    <v-list-tile-content>
                      <v-list-tile-title>NOVA</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-img max-height='60px' contain v-bind:src='novaPicture1'></v-img>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
                <div class='desc'>
                  La classification
                  <b>NOVA</b> nous informe sur le degré de transformation
                  de l'aliment. Plus la note est haute, plus l'aliment a été transformé en usine,
                  et plus il est mauvais pour la santé.
                </div>
              </v-tooltip>
              <v-tooltip top color='black'>
                <template v-slot:activator='{ on }'>
                  <v-list-tile v-on:click='nutriscoreDetails' v-on='on'>
                    <v-list-tile-content>
                      <v-list-tile-title>Nutriscore</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-img
                        width='120px'
                        max-width='120px'
                        contain
                        v-bind:src='nutriscorePicture1'
                      ></v-img>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
                <div class='desc'>
                  Le
                  <b>Nutri-Score</b> indique la qualité nutritionnelle d'un produit,
                  du meilleur pour la santé
                  <i>(A)</i> au moins bon
                  <i>(E)</i> .
                </div>
              </v-tooltip>
              <v-tooltip top color='black'>
                <template v-slot:activator='{ on }'>
                  <v-list-tile v-on:click='palmeDetails' v-on='on'>
                    <v-list-tile-content>
                      <v-list-tile-title>Huile de palme</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-if='product1.palme'>
                      <div v-if="product1.palme === 'Oui'">
                        <v-badge color='red' left>
                          <template v-slot:badge>
                            <v-icon dark small>warning</v-icon>
                          </template>
                          <span>{{ product1.palme }}</span>
                        </v-badge>
                      </div>
                      <div v-if="product1.palme === 'Non'">
                        <v-badge color='green' left>
                          <template v-slot:badge>
                            <v-icon dark small>done</v-icon>
                          </template>
                          <span>{{ product1.palme }}</span>
                        </v-badge>
                      </div>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
                <div class='desc'>
                  L'
                  <b>huile de palme</b> est mauvaise pour la santé car elle augmente
                  la concentration de cholestérol dans le corps. À éviter !
                </div>
              </v-tooltip>
            </v-list>
          </div>
        </v-flex>

        <v-flex xs12 sm6 md16 lg8 xl8 offset-xs1 offset-md1 offset-lg1>
          <div class='card tile' v-bind:class="[!product2IsGood ? goodProduct : '', badProduct]">
            <v-card-title class='font-weight-light' v-if='product2.name'>
              <div class='headline font-weight-light tile-title'>
                <div v-if='product2.name.length<20'>{{ product2.name }}</div>
                <div v-else>{{ product2.name.substring(0,20)+'...' }}</div>
              </div>
            </v-card-title>
            <v-img v-bind:src='product2.picture' contain max-height='200px' class='grey lighten-4'></v-img>
            <v-list two-line>
              <v-tooltip top color='black'>
                <template v-slot:activator='{ on }'>
                  <v-list-tile v-on:click='additifsDetails' v-on='on'>
                    <v-list-tile-title>Additifs</v-list-tile-title>
                    <v-list-tile-content>
                      <v-list-tile-action>
                        <v-avatar v-bind:color='color2' size='40'>
                          <span class='white--text headline'>{{ product2.additives }}</span>
                        </v-avatar>
                      </v-list-tile-action>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <div class='desc'>
                  Les
                  <b>additifs</b> alimentaires sont des produits permettant
                  d'améliorer le goût, l'aspect visuel ou encore la conservation
                  de l'aliment. Certains d'entre eux sont mauvais et même dangereux
                  pour la santé !
                </div>
              </v-tooltip>
              <v-tooltip top color='black'>
                <template v-slot:activator='{ on }'>
                  <v-list-tile v-on:click='novaDetails' v-on='on'>
                    <v-list-tile-content>
                      <v-list-tile-title>NOVA</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-img max-height='60px' contain v-bind:src='novaPicture2'></v-img>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
                <div class='desc'>
                  La classification
                  <b>NOVA</b> nous informe sur le degré de transformation
                  de l'aliment. Plus la note est haute, plus l'aliment a été transformé en usine,
                  et plus il est mauvais pour la santé.
                </div>
              </v-tooltip>
              <v-tooltip top color='black'>
                <template v-slot:activator='{ on }'>
                  <v-list-tile v-on:click='nutriscoreDetails' v-on='on'>
                    <v-list-tile-content>
                      <v-list-tile-title>Nutriscore</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-img
                        width='120px'
                        max-width='120px'
                        contain
                        v-bind:src='nutriscorePicture2'
                      ></v-img>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
                <div class='desc'>
                  Le
                  <b>Nutri-Score</b> indique la qualité nutritionnelle d'un produit,
                  du meilleur pour la santé
                  <i>(A)</i> au moins bon
                  <i>(E)</i> .
                </div>
              </v-tooltip>
              <v-tooltip top color='black'>
                <template v-slot:activator='{ on }'>
                  <v-list-tile v-on:click='palmeDetails' v-on='on'>
                    <v-list-tile-content>
                      <v-list-tile-title>Huile de palme</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-if='product2.palme'>
                      <div v-if="product2.palme === 'Oui'">
                        <v-badge color='red' left>
                          <template v-slot:badge>
                            <v-icon dark small>warning</v-icon>
                          </template>
                          <span>{{ product2.palme }}</span>
                        </v-badge>
                      </div>
                      <div v-if="product2.palme === 'Non'">
                        <v-badge color='green' left>
                          <template v-slot:badge>
                            <v-icon dark small>done</v-icon>
                          </template>
                          <span>{{ product2.palme }}</span>
                        </v-badge>
                      </div>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
                <div class='desc'>
                  L'
                  <b>huile de palme</b> est mauvaise pour la santé car elle augmente
                  la concentration de cholestérol dans le corps. À éviter !
                </div>
              </v-tooltip>
            </v-list>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    codeAnswered: '', // code of the product clicked by the user
    nameAnswered: '', // name of the product clicked by the user
    codeHealthier: '', // code of the healthier product
    correctAnswer: true, // indicates if the user has the correct answer

    choix: 0,
    questionAnswered: '',

    code1: '', // code of first product
    product1: [], // data of the product (additives, nova, ...)
    novaPicture1: '', // picture
    nutriscorePicture1: '',

    code2: '',
    product2: [],
    novaPicture2: '',
    nutriscorePicture2: '',

    grade1: 0, // grade of first product
    grade2: 0, // grade of second product

    // colors for additives
    color1: '',
    color2: '',

    // classes for css behaviours (color of tiles)
    product1IsGood: false,
    product2IsGood: true,
    goodProduct: 'tile-wrong',
    badProduct: 'tile-good'
  }),
  methods: {
    /** Goes to next question */
    async nextQuestion () {
      this.$store.commit('nextQuestion')
    },

    /** compute the health grade of each product to determine which one is the best */
    computeGrades (p1, p2) {
      let grade1 = 0
      let grade2 = 0

      // if we don't have additives information of a product, we don't count this parameter in the grade
      if ((p1.additives && p2.additives) !== (undefined && null)) {
        grade1 = parseInt(p1.additives, 10)
        grade2 = parseInt(p2.additives, 10)
      }
      // if we don't have nova information of a product, we don't count this parameter in the grade
      if ((p1.nova && p2.nova) !== (undefined && null)) {
        grade1 += parseInt(p1.nova, 10)
        grade2 += parseInt(p2.nova, 10)
      }

      // if we don't have nutritive information of a product, we don't count this parameter in the grade
      if ((p1.nutrition && p2.nutrition) !== (undefined && null)) {
        switch (p1.nutrition) {
          case 'a':
            grade1 += 0
            break
          case 'b':
            grade1 += 1
            break
          case 'c':
            grade1 += 2
            break
          case 'd':
            grade1 += 3
            break
          case 'e':
            grade1 += 4
            break
          default:
            grade1 += 0
            break
        }

        switch (p2.nutrition) {
          case 'a':
            grade2 += 0
            break
          case 'b':
            grade2 += 1
            break
          case 'c':
            grade2 += 2
            break
          case 'd':
            grade2 += 3
            break
          case 'e':
            grade2 += 4
            break
          default:
            grade2 += 0
            break
        }
      }

      // if we don't have palme information of a product, we don't count this parameter in the grade
      if ((p1.palme && p2.palme) !== (undefined && null)) {
        if (p1.palme === 'Oui') {
          grade1 += 3
        }
        if (p2.palme === 'Oui') {
          grade2 += 3
        }
      }

      //  update fields
      this.grade1 = grade1
      this.grade2 = grade2
    },

    // avoid warning on @click syntax
    additifsDetails () {
    },

    novaDetails () {
    },

    nutriscoreDetails () {
    },

    palmeDetails () {
    }
  },
  created () {
    var scope = this

    scope.questionAnswered = this.$store.getters.getNumberQuestion
    scope.codeAnswered = this.$store.getters.getAnswer
    scope.code1 = this.$store.getters.getCodes.code1
    scope.code2 = this.$store.getters.getCodes.code2
    scope.choix = this.$store.getters.getChoice

    if (scope.code1 !== null) {
      axios
        // send product code to backend
        .post('http://localhost:3000/code', { code: this.code1 })
        // get product information from backend
        .then(function (response) {
          scope.product1 = response.data[0]

          // set additives info
          switch (scope.product1.additives) {
            case 0:
              scope.color1 = 'green'
              break
            case 1:
              scope.color1 = 'green'
              break
            case 2:
              scope.color1 = 'amber'
              break
            case 3:
              scope.color1 = 'orange'
              break
            case 4:
              scope.color1 = 'deep-orange'
              break
            default:
              scope.color1 = 'red darken-1'
          }

          // set palme info
          if (scope.product1.palme > 0 || scope.product1.palmebis > 0) {
            scope.product1.palme = 'Oui'
          } else {
            scope.product1.palme = 'Non'
          }

          // set nova info with picture
          if (scope.product1.nova === null || scope.product1.nova === '' || scope.product1.nova === undefined) {
            scope.novaPicture1 = 'non connu'
          } else {
            scope.novaPicture1 =
              'https://static.openfoodfacts.net/images/misc/nova-group-' +
              scope.product1.nova +
              '.svg'
          }

          // set nutritive info with picture
          if (scope.product1.nutrition === null || scope.product1.nutrition === '' || scope.product1.nutrition === undefined) {
            scope.nutriscorePicture1 = 'non connu'
          } else {
            scope.nutriscorePicture1 =
              'https://static.openfoodfacts.org/images/misc/nutriscore-' +
              scope.product1.nutrition +
              '.png'
          }
        })
    }

    if (scope.code2 !== null) {
      axios
        // send product code to backend
        .post('http://localhost:3000/code', { code: this.code2 })
        // get product information from backend
        .then(function (response) {
          scope.product2 = response.data[0]

          // set additives info
          switch (scope.product2.additives) {
            case 0:
              scope.color2 = 'green'
              break
            case 1:
              scope.color2 = 'green'
              break
            case 2:
              scope.color2 = 'amber'
              break
            case 3:
              scope.color2 = 'orange'
              break
            case 4:
              scope.color2 = 'deep-orange'
              break
            default:
              scope.color2 = 'red'
          }

          // set palme info
          if (scope.product2.palme > 0 || scope.product2.palmebis > 0) {
            scope.product2.palme = 'Oui'
          } else {
            scope.product2.palme = 'Non'
          }

          // set nova info with picture
          if (scope.product2.nova === null || scope.product2.nova === '' || scope.product2.nova === undefined) {
            scope.novaPicture2 = 'non connu'
          } else {
            scope.novaPicture2 =
              'https://static.openfoodfacts.net/images/misc/nova-group-' +
              scope.product2.nova +
              '.svg'
          }

          // set nutritive info with picture
          if (scope.product2.nutrition === null || scope.product2.nutrition === '' || scope.product2.nutrition === undefined) {
            scope.nutriscorePicture2 = 'non connu'
          } else {
            scope.nutriscorePicture2 =
              'https://static.openfoodfacts.org/images/misc/nutriscore-' +
              scope.product2.nutrition +
              '.png'
          }

          // compute grades to determine which one is the best for health
          scope.computeGrades(scope.product1, scope.product2)
          if (scope.grade1 >= scope.grade2) {
            scope.codeHealthier = scope.code2
            scope.product2IsGood = true
            scope.product1IsGood = false
          } else {
            scope.codeHealthier = scope.code1
            scope.product2IsGood = false
            scope.product1IsGood = true
          }

          // set if the answer matches with the best product
          if (scope.codeHealthier === scope.codeAnswered) {
            scope.correctAnswer = true
            scope.$store.commit('goodAnswer')
          } else {
            scope.correctAnswer = false
          }

          // set the name of the product according to the code
          if (scope.codeAnswered === scope.code1) {
            scope.nameAnswered = scope.product1.name
          } else {
            scope.nameAnswered = scope.product2.name
          }
        })
    }
  }
}
</script>

<style>
.container {
  margin-bottom: 3em;
}

.v-list {
  background-color: #F5F5F5!important;
}

.tile-title {
  color: white;
}

.tile {
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
}

.tile-good {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
}

.tile-wrong {
  background-color: #f44336 !important;
  border-color: #f44336 !important;
}

.btn-suivant {
  height:70%;
  padding-top:0.6em;
  padding-bottom:1.2em;
}

.desc {
  text-align: justify;
  color: white;
  font-size: 120%;
  width: 30em;
}
</style>
