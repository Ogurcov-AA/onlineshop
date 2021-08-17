<template>
  <v-hover
      v-slot="{ hover }"
  >
    <v-card
        v-if="display==='card'"
        class="chooseCard inlineBox"
        :elevation="hover ? 16 : 2"
        :class="{ 'on-hover': hover }"
        raised
        max-width="15rem"
        rounded
        light
    >
      <v-img
          :lazy-src="getImg"
          :src="getImg"
          width="100%"
      />
      <div class="title-field">
        <h5 class="title-text">{{ title }}</h5>
      </div>
      <div class="price-field">
        <p>{{ price }}</p>
        <button class="add-to-basket">
          <img src="../assets/Vector.svg">
        </button>

      </div>
    </v-card>
    <v-card
        v-else
        class="chooseCard inlineBox d-flex"
        height="20rem"
        width="90rem"
        :elevation="hover ? 16 : 2"
        :class="{ 'on-hover': hover }"
        raised
        rounded
        light
    >
      <v-img
          :lazy-src="getImg"
          :src="getImg"
          width="30%"
          class="mx-5 my-5 mdl-shadow--4dp rounded-lg"
      />
      <div class="title-field mt-10 px-5 justify-center">
        <h5>{{ title }}</h5>
      </div>
      <div class="d-flex flex-md-column align-center mx-5 my-auto">
        <p class="text-h6">{{ price }}</p>
        <v-btn
            color="primary"
        > Добавить в корзину
        </v-btn>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "card",
  props: ['title', 'description', 'price', 'img', 'display'],
  computed: {
    getImg() {
      return this.img || require('../assets/Image.png')
    },
  }
}

</script>

<style lang="scss" scoped>
.chooseCard {
  margin: 1%;
}

.title-text {
  max-height: 26px;
  padding: 0 10px;
  overflow: hidden;
  line-height: 1;
  letter-spacing: 0.15px;
}

.price-field {
  display: flex;
  justify-content: space-around
}

.add-to-basket {
  visibility: hidden;
}

.chooseCard:hover {

  .add-to-basket {
    visibility: visible;
  }
}
</style>
