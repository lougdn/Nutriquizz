import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import comparison from './components/comparison'
import healthGame from './components/healthGame'
import login from './components/login'
import resultPage from './components/resultPage'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  mode: 'history',
  routes: [
    /* { path: '/',
      component: App,
      name: 'home'
    }, */
    {
      path: '/comparison',
      component: comparison,
      name: 'comparison'
    },
    {
      path: '/healthGame',
      component: healthGame,
      name: 'healthGame'
    },
    {
      path: '/login',
      component: login,
      name: 'login'
    },
    {
      path: '/resultPage',
      component: resultPage,
      name: '/resultPage'
    }
  ]
})

const store = new Vuex.Store({
  state: {
    code: {
      code1: '',
      code2: ''
    },
    user: {
      login: '',
      age: null
    },
    codeClicked: '',
    correctAnswers: 0,
    questionNumber: 0,
    score: 0
  },
  mutations: {
    authenticate (state, { login, age }) {
      state.user.login = login
      state.user.age = age
      router.push('healthGame')
    },
    registerCode (state, { code1, code2 }) {
      state.code.code1 = code1
      state.code.code2 = code2
    },
    checkAnswer (state, { codeClicked }) {
      state.codeClicked = codeClicked // save answer
      router.push('comparison')
    },
    nextQuestion (state) {
      state.questionNumber++
      if (state.questionNumber === 5) {
        router.push('resultPage')
      } else {
        router.push('healthGame')
      }
    },
    resetNbQuestion (state) {
      state.questionNumber = 0
    },
    goodAnswer (state) {
      state.score++
    },
    storeChoice (state, { choix }) {
      state.choix = choix
    }
  },
  getters: {
    getLogin: state => {
      return state.user.login
    },
    getAge: state => {
      return state.user.age
    },
    getUser: state => {
      return state.user
    },
    getCodes: state => {
      return state.code
    },
    getAnswer: state => {
      return state.codeClicked
    },
    getNumberQuestion: state => {
      return state.questionNumber
    },
    getScore: state => {
      return state.score
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
