<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Информация о продукте</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="saveChange">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>Основная информация</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-checkbox v-model="isAllowEditing" label="Разрешить редактирование"></v-checkbox>
           <v-list-item-content>
            <v-text-field label="Название" v-model="element.title" :disabled="!isAllowEditing" outlined></v-text-field>
            <v-text-field hide-details type="number" label="Артикул" v-model="element.id" :disabled="!isAllowEditing"
                          outlined dense></v-text-field>
           </v-list-item-content>
            <v-textarea label="Описание" v-model="element.description" :disabled="!isAllowEditing"
                        outlined></v-textarea>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-select
              v-model="currentCategory"
              :items="getCategoryForProduct"
              chips
              dense
              :disabled="!isAllowEditing"
              hide-details
              label="Категории"
              multiple
          ></v-select>
          <v-text-field hide-details type="number" label="Количество" v-model="element.count"
                        :disabled="!isAllowEditing" outlined dense></v-text-field>
          <v-text-field hide-details type="number" label="Цена" v-model="element.price" :disabled="!isAllowEditing"
                        outlined dense></v-text-field>
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-list-item-content>
            <v-subheader>img mini</v-subheader>
            <v-img max-width="20rem" max-height="30rem"
                   :lazy-src="element.imgMin"
                   :src="element.imgMin"></v-img>
            <v-file-input
                label="Изменить картинку"
                :disabled="!isAllowEditing || imgLoading"
                :loading="imgLoading"
                v-model="mini"
                accept="image/*"
                prepend-icon="mdi-camera"
                dense
            ></v-file-input>
          </v-list-item-content>
          <v-list-item-content>
            <v-subheader>img card</v-subheader>
            <v-img max-width="20rem" max-height="30rem"
                   :lazy-src="element.imgCart"
                   :src="element.imgCart"></v-img>
            <v-file-input
                label="Изменить картинку"
                v-model="cart"
                :loading="imgLoading"
                accept="image/*"
                :disabled="!isAllowEditing || imgLoading"
                prepend-icon="mdi-camera"
                dense
            ></v-file-input>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <v-divider></v-divider>
      <v-list three-line subheader>

      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import {checkProductElement} from '../../helper/checkProductElement'

export default {
  name: "editProduct",
  props: ['element'],
  data: () => ({
    mini: null,
    cart: null,
    dialog: true,
    value: [],
    isAllowEditing: false,
    imgLoading: false
  }),
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },

    saveChange() {
      checkProductElement(this.element)
      this.$store.dispatch('updateProduct', this.element)
    },

    async setImgMini(path, category, file) {
      this.imgLoading = true
      await this.$store.dispatch('uploadingImg', {path: `${path}/${category}/${file.name}`, file: file})
      if (path === 'imgMini')
        this.element.imgMin = this.$store.getters.imgUrl
      else
        this.element.imgCart = this.$store.getters.imgUrl

      this.imgLoading = false
    }
  },

  computed: {
    getCategoryForProduct() {
      let list = []
      for (let item in this.$store.getters.getCategory)
        list.push(item)
      list.push('all')
      return list
    },
    currentCategory: {
      get() {
        let category = []
        for (let item in this.element.category) {
          category.push(item)
        }
        return category
      },
      set(e) {
        let obj = {}
        e.forEach(item => {
          obj[item] = true
        })
        this.element.category = obj
      }
    }
  },

  watch: {
    mini(ne) {
      let category = null
      if (this.currentCategory.length > 0) {
        category = this.currentCategory[1]
      } else category = this.currentCategory[0]
      this.setImgMini('imgMini', category, ne)
    },
    cart(ne) {
      let category = null
      if (this.currentCategory.length > 0) {
        category = this.currentCategory[1]
      } else category = this.currentCategory[0]
      this.setImgMini('imgCard', category, ne)
    }
  },
}
</script>

<style scoped>

</style>
