<template>
  <div class="main-upper-part">
    <div class="mt-5">
      <h1>{{ message }}</h1>
      <v-select
          v-model="filter"
          :items="filterItems"
          item-text="mess"
          item-value="name"
          return-object
          single-line
          placeholder="По дате добавления"
          background-color="#3333330F"
          style="width: 197px;"
      >
      </v-select>
    </div>
    <div>
      <v-btn plain large class="px-0" @click="displayType('card')">
        <img src="../../assets/Tiles.svg" alt="">
      </v-btn>
      <v-btn plain large class="px-0" @click="displayType('line')">
        <img src="../../assets/List.svg" alt="">
      </v-btn>
    </div>
  </div>
</template>

<script>
import {eventBus} from "../../main";

export default {
  name: "mainPageFilter",
  props: ['message'],
  data() {
    return {
      filter: null,
      filterItems: [
        {name: 'dateFilter', mess: 'По дате добавления'},
        {name: 'priceUpFilter', mess: 'По возрастанию цены'},
        {name: 'priceDownFilter', mess: 'По убываниею цены'}
      ]
    }
  },
  methods: {
    displayType(str) {
      this.$emit('display', str)
    }
  },
  watch: {
    filter(ne) {
      eventBus.$emit(ne.name)
    }
  },
  created() {
    eventBus.$on('dropFilter',()=>{
      this.filter = null
    })
  }
}
</script>

<style scoped>
.main-upper-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 3%;
  font-family: Roboto, monospace;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
}
</style>
