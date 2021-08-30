<template>
  <div>
    <v-toolbar flat :height="100" color="#008C9E">
      <basketAdminLayout/>
      <template v-slot:extension>
        <v-tabs align-with-title
                class="navBar"
                v-model="tab">
          <v-tabs-slider color="red"></v-tabs-slider>
          <v-tab
              class="mx-0"
              v-for="item in items" :key="item.name"
              style="background-color: mediumturquoise"
              @click="changeRouter(item.url)"
          >
            {{ item.name }}
          </v-tab>

        </v-tabs>
      </template>
    </v-toolbar>
     </div>
</template>

<script>
import basketAdminLayout from './SearchAndAuthLayout'

export default {
  name: "adminNavBar",
  components: {
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
  mounted() {
    this.items.forEach((item, index) => {
      if (item.url === this.$route.path)
        this.tab = index
    })
  },
  methods: {
    changeRouter(url) {
      if (this.$route.path !== url)
        this.$router.push(url)
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
