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
      <mainPageFilter v-bind:message="searchStr"
                      @display="changeDisplay"/>
      <div class="cards-panel">
        <card v-model="productList"
              v-for="(item,index) in productList" :key="index"
              v-bind:id="item.id"
              v-bind:title="item.title"
              v-bind:description="item.description"
              v-bind:price="item.price"
              v-bind:img="item.imgMin"
              v-bind:display="display"
              v-on:click.native="$router.push(`/product/${item.id}`)"
        />
      </div>

    </div>
  </section>
</template>

<script>
import card from "../components/card";
import mainPageFilter from "../components/filter/mainPageFilter";
import {eventBus} from '../main'

export default {
  components: {
    card,
    mainPageFilter,
  },

  data() {
    return {
      productList: [],
      isDataLoaded: false,
      display: 'card',
      isLoadingMoreProduct: false,
      searchStr: '',
      minPrice: 0,
      maxPrice: 0,
      isAvailable: true
    }
  },

  methods: {
    changeDisplay(e) {
      this.display = e
    },
    sortByStr(list, str) {
      this.productList = []
      list.forEach(item => {
        if (item.title.toLowerCase().indexOf(str) !== -1) {
          this.productList.push(item)
        }
      })
    },

    showProductList(list, category) {
      this.productList = []
      list.forEach(item => {
        if (item.category[category] === true) {
          if (item.available === this.isAvailable) {
            this.productList.push(item)
          }
        }
      })
    },
    Sort(list, category) {
      this.productList = []
      list.forEach(item => {
        if (item.category[category] === true) {
          if (item.price > this.minPrice && item.price < this.maxPrice) {
            if (item.available === this.isAvailable) {
              this.productList.push(item)
            }
          }
        }
      })
    },
    changeMinMaxPrice(category) {
      let list = this.$store.getters.getProductList
      this.productList = []
      list.forEach(item => {
        if (item.category[category] === true) {
          this.productList.push(item)
        }
      })
      let min = (this.productList?.reduce((curr, next) => curr.price < next.price ? curr : next)).price
      let max = (this.productList?.reduce((curr, next) => curr.price > next.price ? curr : next)).price
      eventBus.$emit('priceFilter', {
        maxPrice: max,
        minPrice: min
      })
    }
  },

  watch: {
    searchStr(ne) {
      this.sortByStr(this.$store.getters.getProductList, ne)
    },
  },
  created() {
    eventBus.$on('searchStr', data => {
      this.searchStr = data.searchStr
    })
    eventBus.$on('sortByPrice', data => {
      this.minPrice = data.minPrice
      this.maxPrice = data.maxPrice
      this.Sort(this.$store.getters.getProductList, this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1))
    })
    eventBus.$on('availableFilter', data => {
      this.isAvailable = data.isAvailable
      this.Sort(this.$store.getters.getProductList, this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1))
    })
  },

  beforeRouteUpdate(to, from, next) {
    let category = to.path.substring(to.path.lastIndexOf('/') + 1)
    if (category === '')
      category = 'all'
    this.showProductList(this.$store.getters.getProductList, category)
    this.changeMinMaxPrice(category)
    next()
  },

  async beforeCreate() {
    let category = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1)
    if (category === '')
      category = 'all'
    this.isDataLoaded = false
    await this.$store.dispatch('ProductList')
    this.showProductList(this.$store.getters.getProductList, category)
    this.changeMinMaxPrice(category)
    this.isDataLoaded = true
  },
}
</script>

<style scoped>
.cards-panel {
  display: flex;
  flex-wrap: wrap;
  margin: 0 1rem 0 4rem;
}
</style>
