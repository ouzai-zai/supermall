<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends='recommends'></recommend-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'

  import {getHomeMultidata} from 'network/home'
  


  export default {
    name:"Home",
    data () {
      return {
        banners: [],
        recommends: []
      };
    },

    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    created () {
      // 获取多个数据
      getHomeMultidata().then(res => {
        // this.banners = res.data[0].b[0]
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        console.log('res:' , res);
      })
    },

    computed: {},

    methods: {}
  }
</script>
<style lang='css' scoped>
  .home-nav{
    background-color: #843ef9;
    color: #dc8d36;
    font-size: 23px;
  }
</style>