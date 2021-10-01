<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item" class="goods-list-item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'
  export default {
    name:"Goods",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {

      };
    },

    components: {
      GoodsListItem
    },

    computed: {},

    methods: {}
  }
</script>
<style lang='css' scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>