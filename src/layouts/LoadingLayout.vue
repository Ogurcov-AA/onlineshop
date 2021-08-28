<template>
  <section class="d-flex">
  <v-progress-circular
      :size="70"
      :width="7"

      color="primary"
      indeterminate
  />
  </section>
</template>

<script>
export default {
name: "LoadingLayout"
}
</script>

<style scoped>
section{
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
}
</style>
