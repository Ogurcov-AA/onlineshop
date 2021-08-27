<template>
  <div style="width: 10%; height: 2rem">
    <div v-if="!userIsLoading">
      <v-btn
          color="#0000003D"
          dark
          depressed
          elevation="10"
          @click="login"
      >войти
      </v-btn>
      <login v-if="isLogin"/>
    </div>
    <div v-else>
      <v-btn
          color="#0000003D"
          dark
          depressed
          elevation="10"
          @click="logout"
      >Выйти
      </v-btn>
    </div>
  </div>
</template>

<script>
import login from "./login";

export default {
  name: "loginElement",
  components: {
    login
  },
  data() {
    return {
      isLogin: false
    }
  },
  methods: {
    login() {
      this.isLogin = true
    },
    logout() {
      if(this.$route.path.indexOf('admin')!==-1 || this.$route.path.indexOf('basket')!==-1) {
       console.log("+")
        this.$router.push('/')
      }
      this.$store.dispatch('logoutUser')

    }
  },
  computed: {
    userIsLoading() {
      return this.$store.getters.isLogged
    }
  },
}
</script>

<style scoped>

</style>
