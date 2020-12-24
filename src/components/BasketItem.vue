<template>
  <b-col>
    <b-row class="row mt-3" align-h="center">
      <b-col cols="4">
        <img v-bind:src="basketItem.image" fluid width="200" alt="basketItem.name" />
      </b-col>
      <b-col cols="4">
        <b-row class="basketName">{{basketItem.name}}</b-row>
        <b-row class="text-center basket-price">{{basketItem.price*basketItem.amount}}₺</b-row>
      </b-col>
    </b-row>
    <b-row class="row mt-3 mb-3" align-h="center">
      <b-col cols="4">
        <label for="sb-inline"></label>
        <b-form-spinbutton id="sb-inline" class="basketAmount" v-model="basketItem.amount" inline></b-form-spinbutton>
      </b-col>
      <b-col cols="4">
        <b-button variant="outline-secondary" @click="removeItem(basketItem)">REMOVE</b-button>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  props: {
    basketItem: {
      type: Object,
      required: false,
      default: () => ""
    }
  },

  methods: {
    ...mapMutations(["DELETE_FROM_CART"]),
    removeItem(basketItem) {
      this.DELETE_FROM_CART(basketItem);
      this.$store.dispatch("setSnacks", {
        showing: true,
        text: "The product has been removed from your cart!",
        color: "secondary"
      });
    }
  }
};
</script>

<style>
</style>