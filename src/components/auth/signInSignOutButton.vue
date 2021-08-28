<template>
  <div class="mx-15">
    <div v-if="!userIsLoading">
      <v-btn
          color="#0000003D"
          dark
          depressed
          elevation="10"
          @click="login"
      >войти
      </v-btn>
      <login v-if="dialog"
             v-bind:dialog="dialog"
             @closeLoginDialog="dialog=false"/>
    </div>
    <div v-else class="d-flex align-center">
      <v-btn icon
             outlined
             class="mx-10"
             @click="redirectToBasket">
        <span class="red--text text-h6 text--accent-2">{{ getBasketCount }}</span>
        <v-icon>mdi-basket</v-icon>
      </v-btn>
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
      dialog: false,
    }
  },
  methods: {
    login() {
      this.dialog = true
    },
    logout() {
      if (this.$route.path.indexOf('admin') !== -1 || this.$route.path.indexOf('basket') !== -1) {
        this.$router.push('/')
      }
      this.$store.dispatch('logoutUser')
    },
    redirectToBasket() {
      if (this.$route.path !== '/basket') {
        this.$router.push('/basket')
      }
    }
  },
  computed: {
    userIsLoading() {
      return this.$store.getters.isLogged
    },
    getBasketCount() {
      return Object.keys(this.$store.getters.basket)?.length
    },
  }
}
</script>

<style scoped>

</style>
