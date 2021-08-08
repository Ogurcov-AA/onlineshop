<template>
  <v-toolbar
      color="cyan"
      dark
      dense>
    <v-tabs
        v-model="tab"
        align-with-title
        class="ml-0">

      <v-tab class="mx-0"><v-icon large>mdi-home</v-icon>Все категории</v-tab>
      <v-divider vertical></v-divider>
      <v-tabs-slider color="red"></v-tabs-slider>
      <v-tab
          v-for="item in items"
          :key="item"
          v-on:click="test">
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
        'кошки', 'собаки', 'рыбки', 'грызуны','змеи', 'насекомые', 'другое'
      ],
    }
  },
  methods:{
    test(e){
      console.log(e.target.textContent)
    }
  }
}
</script>

<style scoped>

</style>
