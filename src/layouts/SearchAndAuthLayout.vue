<template>
    <div class="search-field-position">
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

<style scoped>
.search-field-position {
  display: flex;
  align-items: center;

  margin-top: 1%;
  justify-content: space-between;
}
.search-element {
  max-width: 100vw;
  min-width: 40vw;
}
</style>
