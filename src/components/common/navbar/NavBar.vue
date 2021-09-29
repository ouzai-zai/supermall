<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name:"NavBar",
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
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(110, 110, 110, 0.5);

  }
  .left, .right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>