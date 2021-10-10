<template>
  <div class="goods-item" @click="itemClick ">
    <img :src="showImage" alt="" @load="imgageLoad">
    <div class="goods-info">
      <p>商品:{{goodsItem.title}}</p>
      <span class="price">价格:{{goodsItem.price}}</span>
      <!-- <button class="price_btn">购买</button> -->
      <span class="collect">收藏:{{goodsItem.cfav}}</span>
      <!-- <button class="price_btn">收藏</button> -->
    </div>
  </div>
</template>

<script>
  export default {
    name:"GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return []
        }
      },
    },
    data () {
      return {

      };
    },

    components: {},

    computed: {
      showImage() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },

    methods: {
      imgageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>
<style lang='css' scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    /* margin-top: 8px; */
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>