<template>
  <section>
    <adminTable v-bind:headers="headers"
                v-bind:desserts="desserts"
    @editClick="editCategory"/>
    <editCategory v-if="showEditDialog"
                  v-bind:dialog="showEditDialog"
                  v-bind:category="currentCategory"
                  @saveEditCategory="saveCategory"
                  @closeEditCategory="showEditDialog = false"/>

  </section>
</template>

<script>
import adminTable from "../../components/adminPanel/adminTable";
import editCategory from "../../components/adminPanel/editCategory";

export default {
  name: "AdminPanel",
  components: {
    adminTable,
    editCategory
  },
  data() {
    return {
      headers: [
        {text: 'id', sortable: false, divider: true, value: 'id',},
        {text: 'Название', sortable: false, divider: true, value: 'name',},
        {text: 'URL', value: 'url', sortable: false, divider: true,},
        {text: '', value: 'btn', sortable: false, class: 'px-0'},
      ],
      desserts: [],
      showEditDialog: false,
      currentCategory: {},
    }
  },
  methods:{
    editCategory(e,index){
      this.currentCategory = this.desserts[index]
      this.showEditDialog = true
    },
    saveCategory(category){
      this.showEditDialog = false
console.log(category)
    },
    deleteCategory(category){
console.log(category)
    }
  },
  created() {
    let category = this.$store.getters.getCategory
    this.desserts = []
    for (let item in category) {
      let obj = {
        id: item,
        name: category[item].name,
        url: category[item].url
      }
      this.desserts.push(obj)
    }
  }
}
</script>

<style scoped>
</style>
