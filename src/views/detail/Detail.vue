<template>
  <div id="dtail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'

  export default {
    name:"Detail",
    data () {
      return {
        iid: null
      };
    },
    created () {
      // 保存传入的iid
      this.iid = this.$route.params.iid
    },

    components: {
      DetailNavBar
    },

    computed: {},

    methods: {}
  }
</script>
<style lang='css' scoped>

</style>