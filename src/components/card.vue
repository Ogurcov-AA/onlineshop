<template>
  <v-hover
      v-slot="{ hover }">
    <v-card
        v-if="display==='card'"
        class="chooseCard inlineBox"
        :elevation="hover ? 16 : 2"
        :class="{ 'on-hover': hover }"
        raised
        width="10rem"
        rounded
        light>
      <v-img
          :lazy-src="getImg"
          :src="getImg"
          height="70%"
          width="100%"
          class="mb-3"
      />
      <div class="title-field">
        <h5 class="title-text">{{ title }}</h5>
      </div>
      <div class="price-field">
        <p>{{ price }}</p>
        <v-btn class="add-to-basket" icon @click="addToBasket">
          <v-img v-if="available" src="../assets/Vector.svg"/>
          <v-img v-else src="../assets/VectorError.svg"/>
        </v-btn>
      </div>
    </v-card>
    <v-card
        v-else
        class="chooseCard inlineBox d-flex"
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
          max-width="30%"
          class="mx-5 my-5 mdl-shadow--4dp rounded-lg"
      />
      <div class="title-field mt-10 px-5 justify-center" style="width: 50%">
        <h5>{{ title }}</h5>
      </div>
      <div class="d-flex flex-md-column align-center flex-wrap my-auto" style="overflow: auto">
        <p class="text-h6">{{ price }}</p>
        <v-btn
            max-width="10rem"
            :disabled="!available"
            style="white-space: normal"
            color="primary"
            @click.prevent="addToBasket"
        > в корзину
        </v-btn>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import {eventBus} from '../main'

export default {
  name: "card",
  props: ['title', 'description', 'price', 'img', 'display', 'id', 'available'],
  data() {
    return {
      snackbar: false
    }
  },
  computed: {
    getImg() {
      return this.img || require('../assets/Image.png')
    },
  },
  methods: {
    addToBasket(event) {
      event.stopPropagation()
      if (this.available) {
        if (this.$store.getters.user !== null) {
          let uid = this.$store.getters.user.uid
          this.$store.dispatch('addProductToBasketList', {
            uid,
            product: {
              id: this.id,
              count: 1,
              price: this.price,
              img: this.img,
              title: this.title
            }
          })
          eventBus.$emit('snackbar', {snackbar: true, mess: 'Товар добавлен в корзину', timeout: 2000, color: 'green'})
        } else {

          eventBus.$emit('snackbar', {
            snackbar: true,
            mess: 'Авторизируйтесь для добавления товара в корзину',
            timeout: 2000,
            color: 'red'
          })
        }
      } else {
        eventBus.$emit('snackbar', {snackbar: true, mess: 'Нет в наличии', timeout: 2000, color: 'red'})
      }
    }
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
