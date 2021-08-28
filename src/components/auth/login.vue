<template>
  <v-layout row justify-center>
    <v-dialog v-model="isShowDialog" persistent max-width="30%">
      <v-card>
        <v-card-title class="headline">Авторизация</v-card-title>
        <v-card-actions>
          <div id="firebaseui-auth-container" class="mx-auto"></div>
        </v-card-actions>
        <v-card-actions>
          <v-btn width="100%" class="primary" @click="isShowDialog=false">Назад</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

</template>

<script>
import auth from "../../auth";

export default {

  name: "login",
  props: ['dialog'],
  mounted() {
    auth.authForm('#firebaseui-auth-container')
  },
  computed: {
    isShowDialog: {
      get() {
        return this.dialog
      },
      set(e) {
        this.$emit('closeLoginDialog', e)
      }
    }
  }
}
</script>

<style scoped>
@import "../../../node_modules/firebaseui/dist/firebaseui.css";
</style>
