<template>
  <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="showDialog"
  >
    <template v-slot:default>
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Редактирование категории
        </v-toolbar>

        <v-card-text class="mt-5">
          <v-text-field
              label="Название"
              outlined
              v-model="category.name"
              dense
              :disabled="!isAllowEditing"
              clearable
              hide-details
          />
          <v-text-field
              label="url"
              outlined
              dense
              v-model="category.url"
              :disabled="!isAllowEditing"
              clearable
              hide-details
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-checkbox v-model="isAllowEditing"
                      label="Разрешить редактирование"/>
          <v-spacer></v-spacer>
          <v-btn
              text
              @click="close"
          >Закрыть
          </v-btn>
          <v-btn
              text
              :disabled="!checkChanged"
              @click="save"
          >Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "editCategory",
  props: ['category','dialog'],
  data() {
    return {
      isAllowEditing: false,
      checkChanged: false,
    }
  },
  methods: {
    close() {
      this.$emit('closeEditCategory')
    },
    save() {
      this.$emit('saveEditCategory', this.category)
    }
  },
  computed:{
    showDialog: {
      get(){
        return this.dialog()
      }
    }
  },
  watch: {
    "category.name"() {
     this.checkChanged = true
    },
    "category.url"() {
      this.checkChanged = true
    }
  },
  beforeDestroy() {
    this.close()
  }
}
</script>

<style scoped>

</style>
