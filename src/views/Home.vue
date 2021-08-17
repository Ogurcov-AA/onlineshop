<template>
  <section class="main-field">
    <v-progress-circular
        v-if="!isDataLoaded"
        :size="70"
        :width="7"
        color="primary"
        class="d-flex mx-auto"
        indeterminate
    />
    <div v-else>
      <mainPageFilter v-bind:message="'test message'"
      @display="changeDisplay"/>
      <div class="cards-panel">
        <card
            v-for="item in productList" :key="item.id"
            v-bind:title="item.title"
            v-bind:description="'YINGTAI T11 мобильный телефон для пожилых,Лучшая функция,телефон для пожилых,2,2 дюймов,fm фонарь,скорость,DialSOS,большая кнопка,динамик,клавиатура с русским шрифтом,GSM'"
            v-bind:price="item.price"
            v-bind:img="item.imgMin"
            v-bind:display="display"
        />
      </div>
    </div>
  </section>
</template>

<script>
import card from "../components/card";
import mainPageFilter from "../components/mainPageFilter";

export default {
  components: {
    card,
    mainPageFilter
  },
  data() {
    return {
      productList: [],
      isDataLoaded: false,
      display: 'line',
    }
  },
  methods:{
    changeDisplay(e){
      this.display = e
    }
  },


  async beforeCreate() {
    await this.$store.dispatch('ProductList', {per_page: 10, page: 1})
    this.productList = this.$store.getters.getProductList
    this.isDataLoaded = true
  }
}
</script>

<style scoped>
.cards-panel {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
