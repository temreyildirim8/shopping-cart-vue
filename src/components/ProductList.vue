<template>
  <b-container>
    <b-row align-h="center" class="row mt-3 mb-3">
      <b-col cols="5" v-for="productItem in productList" v-bind:key="productItem.id" class="item">
        <product-item :product-item="productItem"></product-item>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import ProductItem from "@/components/ProductItem.vue";
import axios from 'axios';

export default {
  name: "ProductList",
  components: {
    ProductItem
  },

  data() {
    return {
      productList: []
    };
  },

  mounted() {
    this.getProductList();
  },

  methods: {
    getProductList() {
      axios
        .get("https://nonchalant-fang.glitch.me/listing")
        .then(response => (this.productList = response.data));
    }
  }
};

</script>

<style lang="scss">
.item {
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  margin: 5px;
}
.item:hover {
  box-shadow: 0px -4px 24px 0px #b9b9b9;
}

</style>