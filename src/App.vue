<template>
  <div>
    <v-app>
      <component :is="layout"/>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
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
