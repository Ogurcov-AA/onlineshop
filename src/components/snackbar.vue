<template>
  <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {eventBus} from '../main'

export default {
  name: "snackbar",
  data: () => ({
    snackbar: false,
    text: null,
    timeout: null,
    color: 'null'
  }),
  created() {
    eventBus.$on('snackbar', data => {
      this.snackbar = data.snackbar
      this.text = data.mess
      this.timeout = data.timeout
      this.color = data.color
    })
  }
}
</script>

<style scoped>

</style>
