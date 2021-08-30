<template>
  <section>
    <div class="d-flex">
      <div class="basket-card-field">
        <basketElement
            v-for="item in basketProduct" :key="item.basketProductId"
            v-bind:count="item.count"
            v-bind:price="item.price"
            v-bind:img="item.img"
            v-bind:title="item.title"
            v-bind:id="item.id"
            v-bind:basketProductId="item.basketProductId"
            v-bind:checked="item.checked"
            @changeCheckBox="addToSelectedProduct"
            @changeCount="changeCount"/>
        <div class="d-flex align-center justify-space-around flex-column flex-md-row">
          <v-checkbox
              v-model="selectedAll"
              color="primary"
              class="mx-5 my-5"
              hide-details
              label="Выбрать все товары"
          ></v-checkbox>
          <v-btn
              outlined
              @click="deleteSelectedProduct">
            Удалить выбранное
          </v-btn>
        </div>
      </div>
      <ordering
          class="slide-container"
          v-bind:count="getCountSelectedProduct"
          v-bind:sum="getSumSelectedProduct"
          v-bind:productList="selectProduct"
          @deleteProductFromBasket="deleteSelectedProduct"
          style="background-color: white"/>
    </div>
  </section>
</template>

<script>
import basketElement from "../components/basketCard";
import ordering from "../components/ordering";

export default {
  name: "basket",
  data() {
    return {
      basketProduct: [],
      selectProduct: [],
      count: 0,
      sum: 0,
      selectedAll: false,
    }
  },
  components: {
    basketElement,
    ordering
  },
  created() {
    this.basketProduct = []
    Object.entries(this.$store.getters.basket).forEach(item => {
      this.basketProduct.push({
        basketProductId: item[0],
        id: item[1].id,
        count: item[1].count,
        price: item[1].price,
        title: item[1].title,
        checked: false,
        img: item[1].img
      })
    })
  },
  methods: {
    addToSelectedProduct(data) {
      if (data.flag) {
        this.selectProduct.push({
          id: data.id,
          count: data.count,
          price: data.price,
          basketProductId: data.basketProductID
        })
      } else {
        this.selectProduct.forEach((item, index) => {
          if (item.basketProductId === data.basketProductID)
            this.selectProduct.splice(index, 1)
        })
      }
    },
    changeCount(data) {
      this.basketProduct.forEach(item => {
        if (item.basketProductId === data.basketProductId)
          item.count = data.count
      })
    },
    async reRenderBasketList(list) {
      this.basketProduct = []
      await this.$nextTick()
      this.basketProduct = [...list]
    },
    removeSelectProductFromBasket(basketElement) {
      this.selectProduct.forEach((item) => {
        if (item.basketProductId === basketElement)
          return true
      })
      return false
    },

    deleteSelectedProduct() {
      this.basketProduct = this.basketProduct.filter(item => {
        this.$store.dispatch('deleteProduct', {
          basketProductId: item.basketProductId,
          uid: this.$store.getters.user.uid
        })
        this.removeSelectProductFromBasket(item)
      })
      this.selectedAll = false
      this.selectProduct = []
    }
  },
  computed: {
    getCountSelectedProduct() {
      return this.selectProduct.length
    },
    getSumSelectedProduct() {
      if (this.selectProduct.length !== 0) {
        let test = this.selectProduct.reduce((acc, item) => {
          return acc + (item.price * item.count)
        }, 0)
        return test
      } else return 0
    }
  },
  watch: {
    selectedAll(ne) {
      this.basketProduct.forEach(item => item.checked = ne)
      if (ne) {
        this.selectProduct = [...this.basketProduct]
        this.reRenderBasketList(this.basketProduct)
      } else {
        this.reRenderBasketList(this.basketProduct)
        this.selectProduct = []

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basket-card-field {
  width: 70%;
  @media (min-width: 100px) and (max-width: 800px) {
    width: 100%;
  }
}

.slide-container {
  width: 30%;
  @media (min-width: 100px) and (max-width: 800px) {
    width: 60%;
  }
}
</style>
