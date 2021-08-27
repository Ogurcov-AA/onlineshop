<template>
  <v-menu :close-on-click="closeOnClick">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="#00BCD4"
          dark
          style="width: 20%"
          v-bind="attrs"
          v-on="on">Производитель
      </v-btn>
    </template>

    <v-list>
      <v-checkbox
          v-for="(item, index) in items"
          :key="index"
          :label=item.title>
      </v-checkbox>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "filterCategories",
  data() {
    return {
      closeOnClick: true,
      select: [],
      items: [
        {title: 'Programming'},
        {title: 'Design'},
        {title: 'Vue'},
        {title: 'Vuetify'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
