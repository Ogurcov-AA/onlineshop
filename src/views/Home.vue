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
        <card v-model="currentPage"
              v-for="(item,index) in currentPage" :key="index"
              v-bind:id="item.id"
              v-bind:title="item.title"
              v-bind:description="item.description"
              v-bind:price="item.price"
              v-bind:img="item.imgMin"
              v-bind:available="item.available"
              v-bind:display="display"
              v-on:click.native="$router.push(`/product/${item.id}`)"
              style="min-width: 22%"
        />
      </div>
    </div>
    <pagination v-if="productList.length>=10"
                v-bind:length="Math.ceil(productList.length/per_page)"
                v-bind:page="page+1"/>
  </section>
</template>

<script>
import card from "../components/card";
import mainPageFilter from "../components/filter/mainPageFilter";
import pagination from "../components/pagination";
import {eventBus} from '../main'

export default {
  components: {
    card,
    mainPageFilter,
    pagination,
  },

  data() {
    return {
      productList: [],
      isDataLoaded: true,
      display: localStorage.getItem('display'),
      searchStr: '',
      minPrice: 0,
      maxPrice: 0,
      isAvailable: true,
      per_page: 10,
      page: 0,
      currentPage: [],
    }
  },

  methods: {
    changeDisplay(e) {
      this.display = e
      localStorage.removeItem('display')
      localStorage.setItem('display', e)
    },

    showProductList(list, category) {
      this.productList = list.filter(item => {
        if (item.category[category] === true) {
          if (this.checkAvailable(item))
            return item
        }
      })
    },

    checkPrice(item) {
      return item.price >= this.minPrice && item.price <= this.maxPrice;
    },
    checkAvailable(item) {
      return item.available === this.isAvailable
    },
    filter(list, category) {
      this.productList = list.filter(item => {
        if (item.category[category] === true) {
          if (this.checkPrice(item)) {
            if (this.checkAvailable(item))
              return item
          }
        }
      })
    },
    sortByDate() {
      this.productList = this.productList.sort((a, b) => {
        a.added_date = new Date(a.added_date);
        b.added_date = new Date(b.added_date);
        return a.added_date > b.added_date ? -1 : a.added_date < b.added_date ? 1 : 0;
      })
    },
    sortByUpPrice() {
      this.productList = this.productList.sort((a, b) => {
        return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
      })
    },
    sortByDownPrice() {
      this.productList = this.productList.sort((a, b) => {
        return a.price > b.price ? -1 : a.price < b.price ? 1 : 0;
      })
    },
    sortByStr(list, str) {
      this.productList = list.filter(item => {
        if (item.title.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
          return item
        }
      })
    },

    changeMinMaxPrice(category) {
      this.productList = this.getProductList.filter(item => {
        if (item.category[category] === true) {
          return item
        }
      })
      let min = (this.productList?.reduce((curr, next) => curr.price < next.price ? curr : next)).price
      let max = (this.productList?.reduce((curr, next) => curr.price > next.price ? curr : next)).price
      eventBus.$emit('priceFilter', {
        maxPrice: max,
        minPrice: min
      })
    },
    dropSort() {
      eventBus.$emit('dropFilter')
    },

    changePage() {
      this.currentPage = []
      if (this.productList.length > 0) {
        for (let i = this.page * this.per_page; i < this.productList.length && i < (this.page + 1) * this.per_page; i++)
          this.currentPage.push(this.productList[i])
      } else
        this.currentPage = this.productList
    },

    waitData() {
      return new Promise((resolve) => {
        let timer = setInterval(() => {
          if (this.getProductList.length !== 0) {
            clearInterval(timer)
            resolve()
          }
        }, 100)
      })
    },
    async loadData() {
      let category = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1)
      if (category === '')
        category = 'all'
      this.isDataLoaded = false
      await this.waitData()
      this.showProductList(this.getProductList, category)
      this.changeMinMaxPrice(category)
      this.isDataLoaded = true
    }
  },
  computed: {
    getProductList() {
      return this.$store.getters.getProductList
    }
  },

  watch: {
    searchStr(ne) {
      this.sortByStr(this.getProductList, ne)
    },
    productList() {
      this.page = 0
      this.changePage()
    },
    page(ne) {
      eventBus.$emit('changePage', {page: ne})
      this.changePage()
    },
  },
  created() {
    this.loadData()
    eventBus.$on('searchStr', data => {
      this.searchStr = data.searchStr
    })
    eventBus.$on('filterByPrice', data => {
      this.minPrice = data.minPrice
      this.maxPrice = data.maxPrice
      this.filter(this.$store.getters.getProductList, this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1))
    })
    eventBus.$on('availableFilter', data => {
      this.isAvailable = data.isAvailable
      this.filter(this.$store.getters.getProductList, this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1))
    })
    eventBus.$on('dateFilter', () => {
      this.sortByDate()
    })
    eventBus.$on('priceUpFilter', () => {
      this.sortByUpPrice()
    })
    eventBus.$on('priceDownFilter', () => {
      this.sortByDownPrice()
    })
    eventBus.$on('nextPage', data => {
      this.page = data.nextPage - 1
    })
  },
  beforeCreate() {
    this.$store.dispatch('ProductList')
  },

  beforeRouteUpdate(to, from, next) {
    this.dropSort()
    this.productList = []
    let category = to.path.substring(to.path.lastIndexOf('/') + 1)
    if (category === '')
      category = 'all'
    this.showProductList(this.$store.getters.getProductList, category)
    this.changeMinMaxPrice(category)
    next()
  },

  beforeDestroy() {
    eventBus.$off('searchStr')
    eventBus.$off('filterByPrice')
    eventBus.$off('availableFilter')
    eventBus.$off('dateFilter')
    eventBus.$off('priceUpFilter')
    eventBus.$off('priceDownFilter')
    eventBus.$off('nextPage')
  }
}
</script>

<style lang="scss" scoped>
.cards-panel {
  @media (min-width: 100px) and (max-width: 800px) {
    margin: 0 0 0 5%;
  }

  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 1rem 0 3rem;
}
</style>
