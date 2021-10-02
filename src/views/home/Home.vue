<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll" :pull-up-load='true' @pullingUp='loadMore'>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','潮流']" class="tab_control" @tabClick='tabClick'></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="BackClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabCotrol/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from 'components/content/backTop/BackTop.vue'
  
  export default {
    name:"Home",
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]},
        },
        currentType: 'pop',
        isShowBackTop: false
      };
    },

    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    created (){
      // 获取多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
      
    
    methods: {
      // 事件监听方法
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      BackClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        // console.log(-position.y);
        this.isShowBackTop = (-position.y) > 542
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },


      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
      })
      },

    }
  }
</script>
<style lang='css' scoped>
  .home-nav{
    background-color: #843ef9;
    color: #dc8d36;
    font-size: 23px;
    position: sticky;
    top: 0;
    z-index: 9;
  }
  .tab_control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>