<template>
  <b-container>
    <b-row>
      <b-col>
        <b-row class="text-center row mt-3">
          <b-col>
            <img
              v-bind:src="productItem.image"
              fluid
              alt="productItem.name"
              width="200"
              class="img"
            />
          </b-col>
        </b-row>
        <b-row class="text-center row mt-3">
          <b-col class="name">{{ productItem.name }}</b-col>
        </b-row>
        <b-row align-h="center" class="text-center row mb-3 row mt-3">
          <b-col cols="4" class="price">{{ productItem.price }}₺</b-col>
          <b-col cols="4">
            <router-link to="/Basket" name="Basket">
              <b-button @click="addToBasket('add')">ADD BASKET</b-button>
            </router-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import { mapMutations } from "vuex";

export default {
  name: "ProductItem",
  props: {
    productItem: {
      type: Object,
      required: false,
      default: () => ""
    }
  },

  methods: {
    ...mapMutations(["ADD_TO_CART"]),
    addToBasket() {
      this.ADD_TO_CART({
        ...this.productItem,
        amount: 1
      });
      this.$store.dispatch("setSnackBar", {
        showing: true,
        text: "Product added to cart successfully!",
        color: "success"
      });
    }
  }
};
</script>

<style lang="scss">
@use 'main';

.container {
  font-family: main.$font-stack;
  color: main.$font-color;
}

.name {
  font-size: main.$list-name;
}

.price {
  font-size: main.$list-price;
}

@media only screen and (max-width: 420px) {
  .img {
    width: 100px;
  }
}
</style>