<template>
  <div>
    <basketAdminLayout/>
  <v-tabs class="navBar"
      v-model="tab"
      align-with-title
  >
    <v-tabs-slider color="red"></v-tabs-slider>
    <v-tab
        class="mx-0"
        v-for="item in items"
        :key="item.name"
        active-class="active"
        style="background-color: mediumturquoise"
        @click="changeRouter(item.url)"
    >
      {{ item.name }}
    </v-tab>
  </v-tabs>
</div>
</template>

<script>
import basketAdminLayout from './authLayout'

export default {
  name: "adminNavBar",
  components:{
    basketAdminLayout
  },
  data() {
    return {
      tab: null,
      items: [
        {name: 'Товары', url: '/admin/product'},
        {name: 'Категории', url: '/admin/category'},
        {name: 'Заказы', url: '/admin/orders'},
      ],
    }
  },
  methods:{
    changeRouter(url){

        this.$router.push(url).catch(rej=>console.log(rej))
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
