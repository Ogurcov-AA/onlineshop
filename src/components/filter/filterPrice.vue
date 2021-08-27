<template>
  <div class="price-filter">
    <div class="price-filter--text">
      <label>Цена от </label>
      <v-text-field
          v-model="range[0]"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          min=min
          max=max-1
          height="20px"
          style="width: 50px; background:#C4C4C4"
          @change="$set(range, 0, $event)"
      ></v-text-field>

      <label> до </label>
      <v-text-field
          v-model="range[1]"
          class="mt-0 pt-0"
          hide-details
          single-line
          max=max
          min=min+1
          type="number"
          height="20px"
          style="width: 50px;background:#C4C4C4"
          @change="$set(range, 1, $event)"
      ></v-text-field>
    </div>

    <div class="price-filter--slider">
      <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          hide-details
          thumb-color="red"
          color="#00BCD4"
          thumb-label
          class="align-center"/>
    </div>
  </div>
</template>

<script>

import {eventBus} from "../main";

export default {
  name: "filterItems",
  data() {
    return {
      min: '0',
      max: '0',
      range: [this.min, this.max]
    }
  },
  created() {
    eventBus.$on('priceFilter', data => {
      let min = Math.floor(data.minPrice)
      let max = Math.ceil(data.maxPrice)
      this.max = max
      this.min = min
      this.range = [min, max]
    })
  },
  watch: {
    range() {
      eventBus.$emit('sortByPrice', {
        minPrice: this.range[0],
        maxPrice: this.range[1]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.price-filter {
  display: flex;
  width: 15rem;
  justify-content: space-between;
  justify-items: center;
  flex-direction: column;
  margin: 1% 0 0 2%;

  label {
    margin-right: 10px;
    font-size: 16px;
    font-family: Roboto, monospace;
    font-weight: 400;
  }
}

.price-filter--text {
  display: flex;
  justify-items: center;
  align-items: center;
}

.price-filter--slider {
}

</style>
