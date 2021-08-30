<template>
  <v-toolbar
      dense>
    <v-container class="d-flex align-center mx-0" style="width: 100rem">
      <v-combobox
          dense
          outlined
          :items="item"
          v-model="category"
          placeholder="Категория"
          style="max-width: 15%;"
          solo
          hide-details
      />
      <v-text-field
          outlined
          dense
          v-model="title"
          style="max-width: 15%;"
          placeholder="Название"
          hide-details
      />
      <v-text-field
          outlined
          dense
          v-model="article"
          style="max-width: 15%;"
          placeholder="Артикул"
          hide-details
      />
      <label>В наличии</label>
      <v-switch
          v-model="available"
          hide-details
      ></v-switch>
      <v-btn color="transparent" @click="searchProduct">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

    </v-container>
    <v-btn @click="showDialogChanges=true">Создать</v-btn>
    <editProduct
        v-if="showDialogChanges"
        v-bind:element="element"
        @closeDialog="showDialogChanges = false"/>
  </v-toolbar>
</template>

<script>
import editProduct from "./editProduct";

export default {
  name: "adminProductSort",
  components:{
    editProduct
  },
  data() {
    return {
      item: [],
      available: false,
      category: null,
      article: null,
      title: null,
      element: {},
      showDialogChanges: false,
    }
  },
  methods: {
    getCategory() {
      let categoryObj = this.$store.getters.getCategory
      for (let item in categoryObj) {
        this.item.push(item)
      }
    },
    searchProduct(){
      this.$emit('searchAdminProduct', {category: this.category,available: this.available,article:this.article,title:this.title})
    }
  },

  mounted() {
    this.getCategory()
  }
}
</script>

<style scoped>

</style>
