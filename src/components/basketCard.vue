<template>
  <v-card class="d-flex align-center ">
    <v-checkbox
        v-model="ex4"
        color="primary"
        class="mx-5 my-0"
        hide-details
    />
    <v-img max-width="70px"
           max-height="70px"
           class="mx-5"
           :lazy-src="img"
           :src="img">
    </v-img>
    <div class="mx-5" style="width: 70%;">
      <p>{{ title }}</p>
    </div>
    <v-text-field
        v-model=countProduct
        type="number"
        :disabled="ex4"
        :rules="maxRules"
        class="countField mx-5 py-0"
        outlined
    />
    <div>
      <p>{{ price * countProduct }} руб.</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "basketElement",
  props: ['count', 'price', 'title', 'id', 'basketProductId', 'checked', 'img'],
  data() {
    return {
      ex4: this.checked,
      countProduct: this.count,
      limit: 10,
      maxRules: [
        () => {
          if (this.countProduct < 0)
            this.countProduct = 0
          if (this.countProduct > 50)
            this.countProduct = 50
          return true
        }
      ]
    }
  },
  watch: {
    ex4(ne) {
      let id = this.id
      let count = this.countProduct
      let price = this.price * count
      let basketProductID = this.basketProductId
      this.$emit('changeCheckBox', {flag: ne, id, count, price, basketProductID})
    },
    countProduct(ne){
      let basketProductId = this.basketProductId
      let count = ne
      this.$emit('changeCount', {count, basketProductId})
    }
  }
}
</script>

<style scoped>
.countField {
  max-width: 70px;
  max-height: 50px;
}
</style>
