<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center"> 购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';
  export default {
    name:"Cart",
    data () {
      return {

      };
    },

    components: {
      NavBar,
      CartList,
      CartBottomBar
    },

    computed: {
      cartLength() {
        return this.$store.getters.cartLength
      }
    },

    methods: {}
  }
</script>
<style lang='css' scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: #843ef9;
    color: #dc8d36;
    font-weight: 500;
  }
</style>