<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type='3'>
      <ul>
        <li v-for="item in $store.state.cartList">
          {{item}}
        </li>
      </ul>
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :param-info='paramInfo' ref="params"></detail-param-info>
      <detail-comment-info :comment-info='commentInfo' ref="comment"></detail-comment-info>
      <goods-list :goods='recommends' ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
    <back-top @click.native="BackClick" v-show="isShowBackTop"></back-top>
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
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {debounce} from 'components/common/utils.js'
  import {itemListenerMixin} from 'common/mixin'
  import {BACK_POSITION} from 'common/const'
 

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
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false,
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

      // 给getThemmeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs=[]

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        console.log(this.themeTopYs);
      })
    },
    mounted () {},
    updated () {},
    destroyed () {
      this.$bus.$off('itemImgLoad', this.itemImagListener)
    },

    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      BackTop,
      Scroll,
      GoodsList,
    },
    mixins: [itemListenerMixin],

    computed: {},

    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
      },
      contentScroll(position) {
        const positionY = -position.y
        
        let length = this.themeTopYs.length
        for(let i = 0; i < length; i++) {
          // if (positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[i+1]) {
          //   console.log(i);
          // }
          if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // 是否显示回到顶部
        this.isShowBackTop = -position.y > BACK_POSITION
      },
      BackClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      addToCart() {
        // 1.获取商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        // 2.将商品添加到购物车
        // this.$store.commit('addCart', product)
        this. $store.dispatch('addCart', product)
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
    height: calc(100vh - 44px - 30px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>