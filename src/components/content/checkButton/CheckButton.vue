<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name:"CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    methods: {}
  }
</script>
<style lang='css' scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #abc
  }
  .check {
    background-color: red;
    border-color: red;
  }
</style>