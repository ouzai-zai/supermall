<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','潮流']" @tabClick='tabClick' ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll" :pull-up-load='true' @pullingUp='loadMore'>
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','潮流']" @tabClick='tabClick' ref="tabControl2" ></tab-control>
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
  import {debounce} from 'components/common/utils'
  
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
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
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
    computed: {
      activated () {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
      },
      deactivated () {
        this.saveY = this.$refs.scroll.getScrollY()
      }
    },
    created (){       //created 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
      // 获取多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

       
    },
    mounted() {       
      //mounted在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
      // 1.监听item中的图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 50)

      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
      // 2.获取tabControl的offsetTop
      // 所有组件都有一个属性$el: 用于获取组件中的元素
      // this.tabOffsetTop = this.$refs.TabControl.$el.tobOffsetTop
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      BackClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        // console.log(-position.y);
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 542

        // 2.决定tabControl是否吸顶(position: fixed)\
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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

          // 完成了上拉加载更多
          this.$refs.scroll.finishPullUp()
      })
      },

    }
  }
</script>
<style lang='css' scoped>
  #home {
    height: 100hv;
    position: relative;
  }
  .home-nav{
    background-color: #843ef9;
    color: #dc8d36;
/* 
    position: fixed;
    left: 0;right: 0;
    font-size: 23px;
    position: sticky;
    top: 0;
    z-index: 9; */
  }
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>