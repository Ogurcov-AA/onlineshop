<template>
  <v-menu :close-on-click="closeOnClick">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="#00BCD4"
          class="hidden-xs-only"
          dark
          style="width: 20%"
          v-bind="attrs"
          v-on="on">Производитель
      </v-btn>
    </template>

    <v-list>
      <v-checkbox
          v-for="(item, index) in items"
          :key="index"
          :label=item>
      </v-checkbox>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "filterCategories",
  data() {
    return {
      closeOnClick: true,
      select: [],
      items: [],
    }
  },
  methods: {
    changeSubCategoryList(category) {
      this.items = []
      let categoryList = this.$store.getters.getCategory
      for (let item in categoryList) {
        if (item === category) {
          this.items = Object.assign(categoryList[item].subcategories)
        }
      }
    }
  },
  created() {
    let category = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1)
    this.changeSubCategoryList(category)
  },
}
</script>

<style scoped>

</style>
