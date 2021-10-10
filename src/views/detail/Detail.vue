<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :param-info='paramInfo'></detail-param-info>
      <detail-comment-info :comment-info='commentInfo'></detail-comment-info>
      <goods-list :goods='recommends'></goods-list>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin} from 'common/mixin'


  export default {
    name:"Detail",
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
      };
    },
    created () {
      // 保存传入的iid
      this.iid = this.$route.params.iid

      // 请求详情数据
      getDetail(this.iid).then(res => {
        // 获取顶部图片轮播图数据
        // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 获取商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 保存商品详情数据
        this.detailInfo = data.detailInfo
        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 取出评论信息
        if (data.rate.cRate !==0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      // 请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      })
    },
    mounted () {
      
    },
    destroyed () {
      this.$bus.$off('itemImgLoad', this.itemImagListener)
    },

    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
    },
    mixins: [itemListenerMixin],

    computed: {},

    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>
<style lang='css' scoped>
  #detail {
    position: relative;
    z-index: 11;
    background-color: #fff;
  }
  .content {
    height: calc(100vh - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>