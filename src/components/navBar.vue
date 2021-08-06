<template>
  <v-toolbar
      color="cyan"
      dark
      dense>
    <v-tabs
        v-model="tab"
        align-with-title
        class="ml-0">
      <v-icon>mdi-home</v-icon>
      <v-tabs-slider color="red"></v-tabs-slider>
      <v-tab
          v-for="item in items"
          :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

  </v-toolbar>

</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      tab: null,
      items: [
        'Все категории', 'кошки', 'собаки', 'рыбки', 'грызуны','змеи', 'насекомые', 'другое'
      ],
    }
  }
}
</script>

<style scoped>

</style>
