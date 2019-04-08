<template>
  <v-app id="inspire" light>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    this.movePage('login')
  },
  methods: {
    movePage (path) {
      this.$router.push(path)
    }
  }
}
</script>
