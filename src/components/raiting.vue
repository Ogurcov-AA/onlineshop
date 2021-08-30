<template>
  <v-container class="d-flex justify-end">
    <span class="black--text text--lighten-2 text-caption mr-2">
        ({{ averageRating }})
      </span>
    <v-rating
        v-model="rating"
        :value="averageRating"
        background-color="gray"
        color="yellow accent-4"
        @click="setRating"
        dense
        half-increments
        hover
        size="18"
    ></v-rating>
  </v-container>
</template>

<script>

export default {
  props: ['averageRating','currentRating'],
  data() {
    return {
      rating: null
    }
  },
  methods:{
    setRating(){
      this.$emit('rating', this.rating)
    }
  },
  created() {
      if(this.currentRating)
       this.rating = this.currentRating
  },
  watch:{
    rating(ne){
      if(this.currentRating!==ne)
        this.setRating()
    }
  }

}

</script>

<style scoped>

</style>
