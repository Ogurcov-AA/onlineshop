<template>
  <v-hover
      v-slot="{ hover }"
      close-delay="100"
  >
    <v-card class="chooseCard"
            :elevation="hover ? 16 : 2"
            :class="{ 'on-hover': hover }"
            max-width="180px"
            max-height="258px"
            raised
            rounded
            light
    >
      <img
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
  </v-hover>
</template>

<script>
export default {
  name: "card",
  props: ['title', 'description', 'price', 'img'],
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

  .add-to-basket:hover {
    img {
      filter: invert(30%);
    }
  }
}
</style>
