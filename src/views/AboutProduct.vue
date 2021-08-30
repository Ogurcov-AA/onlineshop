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
    <v-container v-if="isDataLoaded">
      <v-img
          :lazy-src="getLazyImg"
          :src='getLazyImg'
          width="20rem"
          height="20rem"
          class="float-left mr-3"
      />

      <div class="d-flex justify-md-space-between flex-wrap">
        <h1 class="mr-3">{{ obj.title }}</h1>
        <h1 v-if="obj.available" class="primary--text">В наличий</h1>
        <h1 v-else class="red--text text-h6">Нет в наличии</h1>
      </div>

      <v-divider class="primary mt-2"/>

      <div class="d-flex justify-md-space-between mx-0">
        <div class="ml-2 mt-2" style="width: 35%">
          <p class="my-0" v-for="item in obj.specifications" :key="item.category">
            {{ item.category }}: {{ item.parameter }}
          </p>
        </div>
        <div>
          <h1 class="mx-auto mb-2">{{ obj.price }} руб.</h1>
          <v-btn large color="primary" :disabled="!obj.available" @click="addToBasket">В корзину</v-btn>
        </div>
      </div>

      <div class="d-flex mt-5">
        <p>{{ obj.added_date.slice(0, 10) }}</p>
      </div>

      <v-divider class="primary my-2"/>

      <div class="mx-auto">
        <h2>Полное описание</h2>
        <p class="my-3">{{ obj.description }}</p>
      </div>
   <rating v-bind:averageRating="this.$store.getters.getRating.averageRating"
           v-bind:currentRating="this.$store.getters.getRating.currRating"
   @rating="setRatingForProduct"/>
    </v-container>

  </section>
</template>

<script>

import {eventBus} from "../main";
import rating from "../components/raiting";

export default {
  name: "AboutProduct",
  components:{
    rating
  },
  data() {
    return {
      isDataLoaded: false,
      rating: null,
      obj: {}
    }
  },
  methods: {
    addToBasket() {
      console.log(this.obj)
      let uid = this.$store.getters.user.uid
      this.$store.dispatch('addProductToBasketList', {
        uid,
        product: {
          id: this.obj.id,
          count: 1,
          price: this.obj.price,
          img: this.obj.imgMin,
          title: this.obj.title
        }
      })
      eventBus.$emit('snackbar', {snackbar: true, mess: 'Товар добавлен в корзину', timeout: 2000})
      this.$store.dispatch('getBasket', this.$store.getters.user.uid)
    },
    setRatingForProduct(rating){
      this.$store.dispatch('updateRating', {productId: this.obj.id,uid:this.$store.getters.user.uid,rating:rating})
    }
  },
  async beforeCreate() {
    this.isDataLoaded = false
    await this.$store.dispatch('getProduct', this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1))
    if (!this.$store.getters.getErrorLoading && !this.$store.getters.getLoadingFlag) {
      this.obj = this.$store.getters.getProduct
    }
   await this.$store.dispatch('getRating',{productId: this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1), uid:this.$store.getters.user.uid})
    this.rating = this.$store.getters.getRating
    this.isDataLoaded = true
  },
  computed: {
    getLazyImg() {
      return this.obj?.imgCart
    }
  },
}
</script>

<style scoped>

</style>
