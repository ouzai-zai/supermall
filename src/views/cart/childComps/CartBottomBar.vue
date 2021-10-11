<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked='isSelectAll' @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计： {{totalPrice}}
    </div>

    <div class="caculate">
      去计算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue';
  export default {
    name:"CartBottomBar",
    data () {
      return {

      };
    },

    components: {
      CheckButton,
    },

    computed: {
      totalPrice() {
        return this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // return !(this.$store.state.cartList.filter(item => item.checked).legnth)
        if (this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },

    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>
<style lang='css' scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 39px;
    flex: 1;
  }
  .caculate {
    width: 90px;
    text-align: center;
    color: #fff;
    background-color: red;
    font-size: 15px;
  }
</style>