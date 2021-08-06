<template>
  <div style="align-items: center">
    <v-switch
        v-model="switch1"
        :label="'В наличии'"
        color="#00BCD4"
        style="height: 20px;font-size: 20px; width: 20rem"
    ></v-switch>
  </div>
</template>

<script>
export default {
name: "availableFilter",
  data () {
    return {
      switch1: true,
    }
  },
}
</script>

<style scoped>

</style>
