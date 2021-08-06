<template>
  <div>
    <v-app-bar dense prominent color="#008C9E" style="height: 9rem">
      <div class="header">
        <div class="search-field-position">
          <searchElement class="search-element"/>
          <v-btn
              color="#0000003D"
              dark
              depressed
              elevation="10"
          >войти
          </v-btn>
        </div>
        <div class="header-filters">
          <filterPrice v-bind:min="0" v-bind:max="100" class="filter-right-margin"/>
          <filterCategories class="filter-right-margin"/>
          <availableFilter class="filter-right-margin"/>
        </div>
      </div>
    </v-app-bar>
    <navBar/>
  </div>
</template>

<script>
import searchElement from "../components/searchElement";
import filterPrice from "../components/filterPrice";
import filterCategories from "../components/filterCategories";
import availableFilter from "../components/availableFilter";
import navBar from "../components/navBar";

export default {
  components: {
    searchElement,
    filterPrice,
    filterCategories,
    availableFilter,
    navBar
  }
}
</script>

<style lang="scss" scoped>
.search-field-position {
  display: flex;
  align-items: center;
  margin-top: 2%;
  justify-content: space-around;
}
.header{
  display: flex;
  flex-direction: column;
  width: 100rem;
  margin: 0 auto
}
.search-element{
  max-width: 100vw;
  min-width: 40vw;
}
.header-filters{
  display:flex;
  align-items: center;
  justify-content: space-evenly
}
.filter-right-margin{
  margin-right: 5rem;
}

</style>
