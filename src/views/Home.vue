<template>
  <div>
    <b-row>
      <b-col>
        <b-navbar toggleable type="light">
          <router-link to="/" name="Basket">
            <b-navbar-brand href="/">Product List</b-navbar-brand>
          </router-link>
          <router-link to="/Basket" name="Basket">
            <b-button size="lg" class="mb-2">
              <b-icon icon="bucket" aria-hidden="true"></b-icon>
            </b-button>
          </router-link>
        </b-navbar>
      </b-col>
    </b-row>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: "Home"
};

</script>

<style lang="scss">
@use 'main.scss';

.navbar {
  background-color: main.$bg-color !important;
}

.navbar-brand {
  color: main.$text-color !important;
  font-size: 24px !important;

}

.btn-secondary {
  background-color: main.$bg-color !important;
  border-color: main.$bg-color !important;
  border-radius: 0.2rem !important;
}
</style>



