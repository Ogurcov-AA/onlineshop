<template>
  <div style="align-items: center">
    <v-switch
        v-model="isAvailable"
        :label="'В наличии'"
        color="#00BCD4"
        style="height: 20px;font-size: 20px; width: 20rem"
    ></v-switch>
  </div>
</template>

<script>
import {eventBus} from "../../main";

export default {
name: "availableFilter",
  data () {
    return {
      isAvailable: true,
    }
  },
  watch:{
    isAvailable(ne){
      eventBus.$emit('availableFilter', {
        isAvailable: ne
      })
    }
  }
}
</script>

<style scoped>

</style>
