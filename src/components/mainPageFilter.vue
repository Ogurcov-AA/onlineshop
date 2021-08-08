<template>
  <div class="main-upper-part">
    <div class="mt-5">
      <h1>{{ message }}</h1>
      <v-select
          :items="['По дате добавления', 'По убыванию цены', 'По возрастанию цены']"
          placeholder="По дате добавления"
          background-color="#3333330F"
          style="width: 197px;"

      >
        <template v-slot:item="{ item, attrs, on }">
          <v-list-item
              v-bind="attrs"
              v-on="on"
          >
            <v-list-item-title
                :id="attrs['aria-labelledby']"
                v-text="item"
            ></v-list-item-title>
          </v-list-item>
        </template>
      </v-select>
    </div>
    <div>
      <v-btn plain large class="px-0">
        <img src="../assets/Tiles.svg" alt="">
      </v-btn>
      <v-btn plain large class="px-0">
        <img src="../assets/List.svg" alt="">
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainPageFilter",
  props: ['message']
}
</script>

<style scoped>
.main-upper-part{
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 3%;
  font-family: Roboto,monospace;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
}
</style>
