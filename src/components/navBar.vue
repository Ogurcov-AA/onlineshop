<template>
  <v-sheet elevation="6">
    <v-tabs
        v-model="activeTab"
        background-color="cyan"
        dark
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
    >
      <v-tabs-slider color="red"></v-tabs-slider>
      <v-tab @click="jumpNewPage('/category/all')">
        <v-icon large>mdi-home</v-icon>
        Все категории
      </v-tab>
      <v-tab
          v-for="(i,index) in category"
          :key="index+1"
          @click="jumpNewPage(i.url)"
      >
        {{ i.name }}
      </v-tab>
    </v-tabs>
  </v-sheet>
</template>

<script>
export default {
  name: "navBar",
  props: ['category'],
  data() {
    return {
      tabIndex: null
    }
  },
  methods: {
    jumpNewPage(url) {
      if (this.$route.path !== url) {
        this.$router.push(url)
      }
    }
  },
  computed: {
    activeTab: {
      get() {
        let tabIndex = 0
        this.category.forEach((item, index) => {
          if (item.url === this.$route.path)
            tabIndex = index + 1
        })
        return tabIndex
      },
      set() {
      }
    }
  }
}
</script>

<style scoped>

</style>
