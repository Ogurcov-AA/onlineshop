<template>
  <div>
    <v-app-bar dense prominent color="#008C9E" style="height: 8rem">
      <div class="header">
        <div class="search-field-position">
          <searchElement class="search-element"/>
          <v-btn
              color="#0000003D"
              dark
              depressed
              elevation="10"
              @click.stop="isShowLogin=true"
          >войти
          </v-btn>
         <login v-if="isShowLogin"
                v-bind:dialog="isShowLogin"
                @response="changeShowLoginFlag"></login>
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
import login from "../components/login";
export default {
  data(){
    return{
      isShowLogin: false
    }
  },
  components: {
    searchElement,
    filterPrice,
    filterCategories,
    availableFilter,
    navBar,
    login
  },
  methods:{
    changeShowLoginFlag(res){
      this.isShowLogin = false
      if(res!==null){
        return true
      }
    }
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
