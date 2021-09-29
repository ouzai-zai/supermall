<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
          class="tab-control-item" 
          :class="{active: index === currentIndex}" 
          @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:"TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        currentIndex: 0
      };
    },

    components: {},

    computed: {},

    methods: {
      itemClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>
<style lang='css' scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 10px;
  }
  .active {
    color: #473aa3;
  }
  .active span {
    border-bottom: 3px solid #af4825
  }

</style>