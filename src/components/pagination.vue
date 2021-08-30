<template>
  <div class="text-center">
    <v-pagination
        v-model="currPage"
        :length="length"
        circle
    ></v-pagination>
  </div>
</template>

<script>
import {eventBus} from "../main";

export default {
  name: "pagination",
  props: ['length', 'page'],
  computed: {
    currPage: {
      get() {
        return this.page
      },
      set(nextPage) {
        eventBus.$emit('nextPage', {nextPage: nextPage})
        let y = window.scrollY;
        let int = setInterval(function () {
          window.scrollTo(0, y);
          y -= 100;
          if (y <= 50) clearInterval(int);
        }, 20);

      }
    }
  }
}
</script>

<style scoped>

</style>
