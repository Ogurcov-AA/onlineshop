<template>
  <v-app>
    <component :is="layout"/>
    <v-main style="background: #F2EEF1">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </v-main>
    <snackbar/>
    <v-footer padless dark>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import snackbar from "./components/snackbar";

export default {
  components:{
    snackbar
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'loading-layout'
    }
  }
};
</script>

<style lang="scss">
.main-field {
  width: 80%;
  margin: 0 10%;
  background: white;
  min-height: 100%;
}
</style>
