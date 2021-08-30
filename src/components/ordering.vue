<template>
  <section class="px-5 feedback">
    <div class="d-flex align-center justify-md-space-between">
      <h2>Выбран {{ count }} товар(ов)</h2>
      <h3 v-if="sum!==0">{{ sum }} руб</h3>
    </div>
    <v-divider class="mx-0"/>
    <v-radio-group v-model="deliveryMethod">
      <template v-slot:label>
        <div>Способ доставки</div>
      </template>
      <v-radio value="courier">
        <template v-slot:label>
          <div>Курьером</div>
        </template>
      </v-radio>
      <v-radio value="post">
        <template v-slot:label>
          <div>Почтой</div>
        </template>
      </v-radio>
    </v-radio-group>
    <v-form
        ref="ordering"
        v-model="valid"
        lazy-validation>
      <div>Адрес доставки</div>
      <v-text-field label="Город"
                    v-model="city"
                    outlined
                    clearable
                    dense
                    class="mb-1"
                    hide-details
                    style="width: 80%"
                    :rules="nameRules"
      />
      <v-text-field
          label="Улица"
          v-model="street"
          :rules="nameRules"
          outlined
          dense
          class="mb-1"
          clearable
          hide-details
      />
      <div class="d-flex justify-space-between mb-1">
        <v-text-field
            label="Дом"
            outlined
            v-model="house"
            dense
            type="number"
            hide-details
        />

        <v-text-field
            label="Квартира"
            outlined
            v-model="apartment"
            dense
            type="number"
            hide-details
        />

        <v-text-field
            label="Подъезд"
            outlined
            v-model="frontDoor"
            dense
            type="number"
            hide-details
        />

        <v-text-field
            label="Этаж"
            outlined
            v-model="floor"
            dense
            type="number"
            hide-details
        />
      </div>
      <v-text-field
          label="Телефон"
          placeholder="375 (__)-___-__-__ "
          outlined
          v-model="phoneNumber"
          class="mb-1"
          dense
          :rules="phoneRules"
          prepend-inner-icon="+"
          clearable
          hide-details
      />
      <v-text-field
          label="ФИО"
          outlined
          dense
          v-model="name"
          :rules="nameRules"
          clearable
          class="mb-1"
          hide-details
      />
      <v-textarea
          name="input-7-1"
          label="Комментарий к заказу"
          outlined
          v-model="comment"
          dense
          hide-details
      />
      <v-btn color="primary" class="my-2" :disabled="!(!!this.count)" @click="checkout">
        Оформить заказ
      </v-btn>
    </v-form>
  </section>
</template>

<script>
export default {
  name: "ordering",
  props: ['count', 'sum', 'productList'],
  data: function () {
    return {
      deliveryMethod: 'courier',
      city: null,
      street: null,
      house: null,
      apartment: null,
      floor: null,
      frontDoor: null,
      phoneNumber: null,
      name: null,
      comment: null,
      valid: true,
      nameRules: [
        v => !!v || 'Обязательное поле',
        v => (v && v.length >= 6) || 'Более 6 символов',
      ],
      phoneRules: [
        v => !!v || 'Обязательное поле'
      ]
    }
  },
  methods: {
    checkout() {
      if (this.$refs.ordering.validate())
        this.$store.dispatch('addOrder', {
          uid: this.$store.getters.user.uid,
          order: {
            deliveryMethod: this.deliveryMethod,
            sum:this.sum,
            status: 'Оплачен',
            email: this.$store.getters.user.email,
            city: this.city,
            street: this.street,
            house: this.house,
            apartment: this.apartment,
            floor: this.floor,
            frontDoor: this.frontDoor,
            phoneNumber: this.phoneNumber,
            name: this.name,
            comment: this.comment,
            product: this.productList
          }
        })
    this.$emit('deleteProductFromBasket')
    }
  },
}
</script>

<style lang="scss" scoped>
.feedback {
  @media (min-width: 100px) and (max-width: 800px) {
    border-radius: 0 10px 10px 0;
    background: #000000;
    position: fixed;
    left: 98%;
    border-right: 20px solid #FFF;
    padding: 10px;
    transition: left 1s;
  }
}
.feedback::after {
  @media (min-width: 100px) and (max-width: 800px) {
    content: 'Оформление заказа';
    color: #000;
    position: absolute;

    background-color: #C4C4C4;
    left: -65px;
    top: 30%;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }
}
.feedback:hover {
  @media (min-width: 100px) and (max-width: 800px) {
    left: 45%;
  }
}
</style>
