<template>
  <section>
    <adminProductSort/>
    <adminTable v-bind:headers="headers"
                v-bind:desserts="desserts"/>

  </section>
</template>

<script>
import adminTable from "../../components/adminPanel/adminTable";
import adminProductSort from "../../components/adminPanel/adminProductSort";

export default {
  name: "AdminPanel",
  components: {
    adminTable,
    adminProductSort
  },
  data() {
    return {
      headers: [
        {text: 'id', sortable: false, divider: true, value: 'id',},
        {text: 'Пользователь', value: 'user', sortable: false, divider: true,},
        {text: 'Сумма заказа', value: 'sum', sortable: false, divider: true,},
        {text: 'Номер заказа', value: 'orderId', sortable: false, divider: true,},
        {text: 'Статус', value: 'status', sortable: false,},
        {text: 'Доставка', value: 'deliverMethod', sortable: false,},
        {text: 'Email', value: 'email', sortable: false,},
        {text: '', value: 'btn', sortable: false, class: 'px-0'},
      ],
      desserts: [
        {
          id: 518,
          user: 'Hishad',
          sum: 322,
          orderId: 12313,
          status: 'в пути',
          deliverMethod: 'post',
          email: 'test@mail.com'
        },

        {
          id: 518,
          user: 'Hishad',
          sum: 322,
          orderId: 12313,
          status: 'в пути',
          deliverMethod: 'post',
          email: 'test@mail.com'
        },

        {
          id: 518,
          user: 'Hishad',
          sum: 322,
          orderId: 12313,
          status: 'в пути',
          deliverMethod: 'post',
          email: 'test@mail.com'
        },

        {
          id: 518,
          user: 'Hishad',
          sum: 322,
          orderId: 12313,
          status: 'в пути',
          deliverMethod: 'post',
          email: 'test@mail.com'
        },
        {
          id: 518,
          user: 'Hishad',
          sum: 322,
          orderId: 12313,
          status: 'в пути',
          deliverMethod: 'post',
          email: 'test@mail.com'
        },

        {
          id: 518,
          user: 'Hishad',
          sum: 322,
          orderId: 12313,
          status: 'в пути',
          deliverMethod: 'post',
          email: 'test@mail.com'
        },
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
