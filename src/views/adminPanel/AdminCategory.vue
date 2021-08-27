<template>
  <section>
    <adminProductSort/>

  </section>
</template>

<script>
import adminProductSort from "../../components/adminPanel/adminProductSort";

export default {
  name: "AdminPanel",
  components: {
    adminProductSort
  },
  data() {
    return {
      headers: [
        {text: 'Название', sortable: false, divider: true, value: 'name',},
        {text: 'Артикул', value: 'id', sortable: false, divider: true,},
        {text: 'Категория', value: 'category', sortable: false, divider: true,},
        {text: 'Статус', value: 'status', sortable: false, divider: true,},
        {text: 'Количество на складе', value: 'count', sortable: false,},
        {text: '', value: 'btn', sortable: false, class: 'px-0'},
      ],
      desserts: [
        {name: 'KitKt', id: 518, category: 'Спорт', status: 'в пути', count: 7},
        {name: 'Kitat', id: 517, category: 'Спорт', status: 'в пути', count: 7},
        {name: 'KiKat', id: 516, category: 'Спорт', status: 'в пути', count: 7},
        {name: 'KtKat', id: 515, category: 'Спорт', status: 'в пути', count: 7},
      ],
    }
  }
}
</script>

<style scoped>
.navBar {
  position: sticky;
  top: 0;
}
</style>
