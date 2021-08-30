<template>
  <div class="search-field-position d-flex align-center align-content-md-space-between">
    <searchElement class="search-element"/>
    <loginElement/>
  </div>
</template>
<script>
import searchElement from "../components/filter/searchElement";
import loginElement from "../components/auth/signInSignOutButton";

export default {
  name: "basketLayouts",
  components: {
    searchElement,
    loginElement
  }
}
</script>

<style lang="scss" scoped>
.search-field-position {
  margin-top: 1%;
  justify-content: space-between;

  @media (min-width: 100px) and (max-width: 700px) {
    justify-content: start;
    width: 30%;
  }
}

.search-element {
  max-width: 100vw;
  min-width: 40vw;
}
</style>
