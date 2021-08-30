<template>
  <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1">
    <template v-slot:body="{ items }">
      <tbody class="v-table">
      <tr v-for="(item,index) in items" :key="item.id">
        <td>
          <v-checkbox v-model="selected"
                      :value="item"
                      style="margin:0;
                      padding:0"
                      hide-details/>
        </td>
        <td v-for="elem of item" :key="elem">{{ elem }}</td>
        <td class="px-0">
          <v-btn icon @click="editButtonClick(item,index)">
            <v-icon>mdi-file-edit</v-icon>
          </v-btn>
          <v-btn icon @click="removeProduct(item,index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>

export default {
  name: "adminTable",
  props: ['headers', 'desserts'],
  data() {
    return {
      singleSelect: false,
      selected: [],
    }
  },
  methods: {
    editButtonClick(item,index){
      this.$emit('editClick', item.id,index)
    },
    removeProduct(item,index){
      this.$emit('removeProduct', item.id,index)
    }
  }

}
</script>

<style scoped>

.v-table {
  width: 450px;
  margin: 0 auto;
  border-collapse: collapse;
  font-size: 13px;
  font-family: arial,serif;
}

.v-table td {
  border: 1px solid #fdfcfc;
}

.v-table tr:nth-child(odd) {
  background: #d2d2d2;
}

.v-table tr:hover {
  background: #282828;
  color: #212121;
}
</style>
