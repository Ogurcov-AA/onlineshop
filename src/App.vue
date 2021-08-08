<template>
    <v-app>
      <component :is="layout"/>
      <v-main style="background: #F2EEF1">
        <router-view/>
      </v-main>
    </v-app>
</template>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || 'default-layout'
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
