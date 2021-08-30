<template>
  <section>
    <adminProductSort @searchAdminProduct="sortProduct"/>
    <adminTable
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
      sortFlag: false,
      sortArray: [],
      headers: [
        {text: 'Название', sortable: false, divider: true, value: 'name',},
        {text: 'Артикул', value: 'id', sortable: false, divider: true,},
        {text: 'Категория', value: 'category', sortable: false, divider: true,},
        {text: 'Статус', value: 'status', sortable: false, divider: true,},
        {text: 'Количество на складе', value: 'count', sortable: false,},
        {text: '', value: 'btn', sortable: false, class: 'px-0'},
      ],
    }
  },
  computed:{
    desserts: {
      get() {
        if(!this.sortFlag)
        return this.parseProduct()
        else
        return this.sortArray
      },
      set(sortArray){
        console.log(sortArray)
        this.sortArray = sortArray
      }
    }
  },
  methods: {
    parseProduct(){
     return this.$store.getters.getProductList.map(item => {
        return {
          name: item.title,
          id: item.id,
          category: this.getCategoryForProduct(item.category).toString(),
          status: this.getAvailable(item.available),
          count: item.count
        }
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
      this.$store.getters.getProductList.forEach(item => {
        if (item.id === e)
          this.element = item
      })
      this.showDialogChanges = true
    },
    removeProduct(id) {
      this.$store.dispatch('removeProduct', id)
    },
    sortForField(item, field) {
      if (field === null)
        return true
      else if (item.indexOf(field) !== -1)
        return true
      return false
    },

    sortProduct(data) {
      this.sortFlag = true
      let sortList = []
      this.parseProduct().forEach(item => {
        if (this.sortForField(item.category, data.category)) {
          if (this.sortForField(item.title, data.title)) {
            if (this.sortForField(item.id, data.article)) {
              if (item.status === this.getAvailable(data.available)) {
                sortList.push(item)
              }
            }
          }
        }
      })
      this.desserts = sortList
    }
  },
   created() {
    this.isDataLoaded = false
     this.$store.dispatch('ProductList', 'all')
  //  this.loadData()
    this.isDataLoaded = true
  },

}
</script>

<style scoped>
</style>
