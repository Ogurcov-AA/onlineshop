<template>
  <v-toolbar
      dense>
    <v-container class="d-flex align-center mx-0" style="width: 100rem">

      <v-combobox
          dense
          outlined
          :items="item"
          placeholder="Категория"
          style="max-width: 15%;"
          solo
          hide-details
      />
      <v-text-field
          outlined
          dense
          style="max-width: 15%;"

          placeholder="Название"
          hide-details
      />

      <v-text-field
          outlined
          dense
          style="max-width: 15%;"

          placeholder="Артикул"
          hide-details
      />
      <label>В наличии</label>
      <v-switch
          v-model="available"
          hide-details
      ></v-switch>


      <v-btn color="transparent">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>


    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  name: "adminProductSort",
  data() {
    return {
      item: [],
      available: false
    }
  },
  methods: {
    getCategory() {
      let categoryObj = this.$store.getters.getCategory
      for (let item in categoryObj) {
        this.item.push(item)
      }
    }
  },

  mounted() {
    this.getCategory()
  }
}
</script>

<style scoped>

</style>
