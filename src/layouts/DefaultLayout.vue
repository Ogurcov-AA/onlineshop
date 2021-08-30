<template>
  <div>
    <v-app-bar dense prominent color="#008C9E" style="height: 8rem">
      <div class="header d-flex flex-column">
        <SearchAndAuthLayout/>
        <div class="header-filters d-flex">
          <filterPrice class="mr-sm-10"/>
          <filterCategories class="mr-sm-10"/>
          <availableFilter class="ml-sm-10"/>
        </div>
      </div>
    </v-app-bar>
    <navBar v-bind:category='category'/>
  </div>
</template>

<script>
import filterPrice from "../components/filter/filterPrice";
import filterCategories from "../components/filter/filterCategories";
import availableFilter from "../components/filter/availableFilter";
import navBar from "../components/navBar";
import SearchAndAuthLayout from "./SearchAndAuthLayout";

export default {
  components: {
    SearchAndAuthLayout,
    filterPrice,
    filterCategories,
    availableFilter,
    navBar,
  },
  data() {
    return {
      category: [],
    }
  },
  methods: {
    getCategory() {
      let categoryObj = this.$store.getters.getCategory
      for (let item in categoryObj) {
        this.category.push({name: categoryObj[item].name, url: categoryObj[item].url})
      }
    }
  },

  mounted() {
    this.getCategory()
  }
}
</script>

<style lang="scss">
.search-field-position {
  display: flex;
  align-items: center;
  margin-top: 1%;
  justify-content: space-around;
}

.header {
  width: 100rem;
  margin: 0 auto;
}

.search-element {
  max-width: 100vw;
  min-width: 40vw;
}

.header-filters {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media (min-width: 100px) and (max-width: 480px)
  {
    flex-direction: column;
  }
}

</style>
