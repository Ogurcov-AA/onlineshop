<template>
  <section>
    <adminProductSort/>
    <adminTable v-if="isDataLoaded"
                v-bind:headers="headers"
                v-bind:desserts="desserts"
                @editClick="showDialog"
                @removeProduct="removeProduct"/>
    <editProduct
        v-if="showDialogChanges"
        v-bind:element="element"
        @closeDialog="showDialogChanges = false"/>
  </section>
</template>

<script>
import adminTable from "../../components/adminPanel/adminTable";
import adminProductSort from "../../components/adminPanel/adminProductSort";
import editProduct from "../../components/adminPanel/editProduct";

export default {
  name: "AdminPanel",
  components: {
    adminTable,
    adminProductSort,
    editProduct
  },
  data() {
    return {
      showDialogChanges: false,
      element: null,
      headers: [
        {text: 'Название', sortable: false, divider: true, value: 'name',},
        {text: 'Артикул', value: 'id', sortable: false, divider: true,},
        {text: 'Категория', value: 'category', sortable: false, divider: true,},
        {text: 'Статус', value: 'status', sortable: false, divider: true,},
        {text: 'Количество на складе', value: 'count', sortable: false,},
        {text: '', value: 'btn', sortable: false, class: 'px-0'},
      ],
      desserts: [],
      isDataLoaded: false,
    }
  },
  async beforeCreate() {
    this.isDataLoaded = false
    await this.$store.dispatch('ProductList', 'all')
    this.loadData()
    this.isDataLoaded = true
  },
  methods: {
    loadData() {
      let list = this.$store.getters.getProductList
      this.desserts = []
      list.forEach(item => {
        let obj = {
          name: item.title,
          id: item.id,
          category: this.getCategoryForProduct(item.category).toString(),
          status: this.getAvailable(item.available),
          count: item.count
        }
        this.desserts.push(obj)
      })
    },
    getCategoryForProduct(categoryList) {
      let list = []
      for (let item in categoryList) {
        list.push(item)
      }
      return list
    },
    getAvailable(item) {
      if (item)
        return 'В наличии'
      return "Нет в наличии"
    },
    showDialog(e) {
      let list = this.$store.getters.getProductList
      list.forEach(item => {
        if (item.id === e)
          this.element = item
      })
      this.showDialogChanges = true
    },
    removeProduct(id) {
      this.$store.dispatch('removeProduct', id)
      this.desserts.forEach((item, index) => {
        if (item.id === id)
          this.desserts.splice(index, 1)
      })
    }
  },
}
</script>

<style scoped>
</style>
