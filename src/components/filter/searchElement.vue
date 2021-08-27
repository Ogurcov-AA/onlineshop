<template>
  <div>
    <v-layout row align-center>
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
    </v-layout>
  </div>
</template>

<script>
import {eventBus} from '../main'

export default {
  data(){
    return{
    searchStr: null
    }
  },
  methods:{
    async keyPress(event){
      if (event.keyCode === 13) {
        eventBus.$emit('searchStr', {
          searchStr: this.searchStr
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
