<template>
  <section class="main-field">
    <v-container>

      <v-img v-if="!errorLoadingImg && obj.imgUrl!==''"
             :lazy-src=getLazyImg
             :src='obj.imgUrl'
             @error="errorLoadImg"
             width="20rem"
             height="20rem"
             class="float-left mr-3"
      />
      <v-img
          v-if="errorLoadingImg || obj.imgUrl===''"
          src='../assets/Image.svg'
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
          <v-btn large color="primary" @click="isLoadingImg=true">В корзину</v-btn>
        </div>
      </div>

      <div class="d-flex mt-5">
        <p>{{ obj.smallDescription }}</p>
      </div>

      <v-divider class="primary my-2"/>

      <div class="mx-auto">
        <h2>Полное описание</h2>
        <p class="my-3">{{ obj.description }}</p>
      </div>
      <div>
        <p class="my-0"><span class="text-h6">Страна производитель: </span>{{ obj.producingСountry }}</p>
        <p class="my-0"><span class="text-h6">Производитель: </span>{{ obj.manufacturer }}</p>
      </div>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "AboutProduct",
  data() {
    return {
      errorLoadingImg: false,
      obj: {
        title: 'test test',
        price: 100,
        specifications: [{
          category: 'вес',
          parameter: 'test1000'
        }],
        smallDescription: 'test test',
        description: 'test',
        manufacturer: 'ООО вцв цв цв фф Беларусь',
        producingСountry: "Беларусь",
        available: true,
        imgLazyUrl: '',
        imgUrl: ''
      }
    }
  },
  computed: {
    getLazyImg() {
      return this.imgLazyUrl
    }
  },
  methods: {
    errorLoadImg() {
      console.log("Error")
      this.errorLoadingImg = true
    }
  }
}
</script>

<style scoped>


</style>
