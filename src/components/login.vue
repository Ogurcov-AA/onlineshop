<template>
  <v-dialog
      v-model="isDialog"
      max-width="30%"
      @click:outside="closeDialog">
    <v-card>
      <v-card-title class="text-h5 mb-5">Вход</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>

        <v-text-field
            label="Email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            placeholder="sample@sample.com"
            type="email"
            outlined
            style="width: 90%"
            class="mx-auto"
            required/>

        <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Пароль"
            hint="Минимум 6 символов"
            outlined
            style="width: 90%"
            class="mx-auto"
            @click:append="show1 = !show1"
            required/>

        <v-card-actions>

          <v-btn
              class="mx-auto mt-0 mb-7 ma-2"
              large
              width="90%"
              :loading="loading"
              :disabled="!valid"
              color="primary"
              @click="authUser">Войти
          </v-btn>

        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "login",
  props: ['dialog'],
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      isDialog: this.dialog,
      show1: false,
      rules: {
        required: value => !!value || 'Обязательный для заполнения',
        min: v => v.length >= 6 || 'Минимум 6 символов',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Не верный email.'
        },
      },
      loader: null,
      loading: false,

    }
  },
  methods: {
    closeDialog() {
      this.$emit('response')
    },
    authUser() {
      if (this.validate()) {
        this.loader = 'loading'
        //    this.$emit('response', true)

      }
    },
    validate() {
      return this.$refs.form.validate()
    },
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(
          () => (this[l] = false), 3000)
      this.loader = null
    },
  },
}
</script>

<style scoped>

</style>
