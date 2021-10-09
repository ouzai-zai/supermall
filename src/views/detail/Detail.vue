<template>
  <div id="dtail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images='topImages'></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop='shop'></detail-shop-info>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'

  import {getDetail, Goods, Shop} from 'network/detail'

  export default {
    name:"Detail",
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      };
    },
    created () {
      // 保存传入的iid
      this.iid = this.$route.params.iid

      // 根据iid进行数据请求
      getDetail(this.iid).then(res => {
        // 获取顶部图片轮播图数据
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 获取商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
      })
    },

    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },

    computed: {},

    methods: {}
  }
</script>
<style lang='css' scoped>

</style>