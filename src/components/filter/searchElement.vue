<template>
    <div class="d-flex py-0">
      <v-btn icon color="white"
             elevation="2"
             class="mx-10"
             style="background-color: #0000003D"
             @click="redirectToMainPage">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-text-field
          v-model="searchStr"
          solo
          placeholder="Поиск по товарам. Например, фильтр для аквариума"
          single-line
          append-icon="mdi-magnify"
          background-color="#0000003D"
          color="white"
          @keyup="keyPress"
          hide-details
      ></v-text-field>
    </div>
</template>

<script>
import {eventBus} from '../../main'

export default {
  data() {
    return {
      searchStr: null
    }
  },
  methods: {
    async keyPress(event) {
      if (event.keyCode === 13) {
        eventBus.$emit('searchStr', {
          searchStr: this.searchStr
        })
      }
    },
    redirectToMainPage() {
      if (this.$route.path !== '/' && this.$route.path !== '/category/all' )
        this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
