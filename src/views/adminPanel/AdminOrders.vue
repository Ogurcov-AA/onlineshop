<template>
  <section>
    <adminTable v-bind:headers="headers"
                v-bind:desserts="desserts"
                @editClick="editOrder"
                @removeProduct="deleteOrder"/>

  </section>
</template>

<script>
import adminTable from "../../components/adminPanel/adminTable";

export default {
  name: "AdminPanel",
  components: {
    adminTable,
  },
  data() {
    return {
      headers: [
        {text: 'id', sortable: false, divider: true, value: 'id',},
        {text: 'Пользователь', value: 'user', sortable: false, divider: true,},
        {text: 'Сумма заказа', value: 'sum', sortable: false, divider: true,},
        {text: 'Статус', value: 'status', sortable: false,},
        {text: 'Доставка', value: 'deliverMethod', sortable: false,},
        {text: 'Email', value: 'email', sortable: false,},
        {text: '', value: 'btn', sortable: false, class: 'px-0'},
      ],
      orderList: null,
    }
  },
  computed:{
    desserts(){
     let list = []
      Object.keys(this.$store.getters.getOrder).forEach(item=>{
        Object.keys(this.$store.getters.getOrder[item]).forEach(order=>{
          list.push(this.createDesserts(this.$store.getters.getOrder[item][order], item,order))
        })
      })
      return list
    }
  },
  methods:{
    createDesserts(item, uid,orderId){
     return {
       id: orderId,
       user: uid,
       sum: item.sum,
       status: item.status,
       deliveryMethod: item.deliveryMethod,
       email: item.email,
     }
    },
    editOrder(id,index){
      console.log(id,index)
    },
    deleteOrder(id,index){
      this.$store.dispatch('deleteOrder',{uid: this.desserts[index].user, orderId: this.desserts[index].id})
    }
  },
  beforeCreate() {
    this.$store.dispatch('getOrderList')
  },
}
</script>

<style scoped>
</style>
