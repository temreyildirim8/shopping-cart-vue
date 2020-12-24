<template>
  <b-container>
    <div v-if="mycartList.length == 0">
      <b-row align-h="center">
        <b-col>
          <b-row class="row mt-3 text-center" align-h="center">
            <b-col cols="8" class="bucket-message">
              <span>Your Bucket Is Empty!</span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <div v-if="mycartList.length > 0">
      <b-row align-h="center">
        <b-col>
          <b-row class="row mt-3 card-header" align-h="center">
            <b-col cols="4">
              <span>MY CART({{mycartList.length}})</span>
            </b-col>
            <b-col cols="4" style="text-align:end">
              <b-button variant="outline-secondary" @click="clearAll" class="clear-button">
                <b-icon icon="trash" aria-hidden="true"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row
        align-h="center"
        class="row mt-3 mb-3 main-row"
        v-for="basketItem in mycartList"
        v-bind:key="basketItem.id"
      >
        <basket-item :basket-item="basketItem"></basket-item>
      </b-row>
    </div>
    <b-row align-h="center">
      <b-col>
        <b-row class="row mt-3 mb-3" align-h="center">
          <b-col cols="4">
            <router-link to="/" name="Basket" class="router-link">
              <b-button block variant="outline-secondary">CONTINUE SHOPPING</b-button>
            </router-link>
          </b-col>
          <b-col cols="4">
            <b-button
              class="order-button"
              :disabled="mycartList.length == 0 ? true : false"
              block
              @click="submitOrder"
            >PLACE ORDER</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col>
        <b-row class="row mt-3 mb-3" align-h="center">
          <b-alert
            :show="snackbar.showing"
            :variant="snackbar.color"
            dismissible
            fade
            class="position-fixed fixed-bottom m-3 rounded-3"
          >{{snackbar.text}}</b-alert>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import { mapGetters } from "vuex";
import BasketItem from "@/components/BasketItem.vue";
import axios from 'axios';
import { mapState } from "vuex";

export default {
  components: {
    BasketItem
  },

  computed: {
    ...mapGetters(["mycartList"]),
    ...mapState(["snackbar"])
  },

  data() {
    return {
      value: BasketItem.amount
    };
  },

  methods: {
    async submitOrder() {
      let orderedItems = [];
      orderedItems = this.mycartList.map(item => {
        return { id: item.id, amount: item.amount };
      });
      try {
        const response =   await axios
                .post("https://nonchalant-fang.glitch.me/order", orderedItems);
          await this.$store.dispatch("setSnacks", {
          showing: true,
          text: response.data.message,
          color: "success"
        });
         await this.$store.dispatch("clearCartItems");
      } catch (err) {
          await this.$store.dispatch("setSnacks", {
          showing: true,
          text: "Dis Fircasi is out of stock!", // We can handle error more effectively but service response does not return id or name of the missing product
          color: "danger"
        });
      }
    },
    clearAll() {
      this.$store.dispatch("clearCartItems");
    }
  }
};
</script>

<style lang="scss">
@use 'main.scss';

.basketName {
  font-size: main.$basket-name;
  margin-top: 1em !important;
}

.basket-price {
  font-size: main.$basket-price;
  margin-top: 3rem !important;
  font-weight: bold;
}

.card-header {
  font-size: main.$list-price !important;
}

.bucket-message {
  font-size: main.$list-price;
  color: #6c757d;
  border: 1px solid #6c757d;
  padding: 10px;
  border-radius: 0.25rem;
}

.router-link {
  text-decoration: none !important;
}

.main-row {
  border-top: 1px solid #e1e1e1;
}

.alert {
  width: 20%;
}
</style>