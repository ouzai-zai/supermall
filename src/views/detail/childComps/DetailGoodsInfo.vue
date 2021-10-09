<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length != 0">
    <div class="info_desc clear-fix">
      <div style="float: left;" class="desc_line">
        <i class="desc_dot"></i>
      </div>
      <div class="desc">
        {{ detailInfo.desc }}
      </div>
      <div style="float: right;" class="desc_line">
        <i style="right: 0px;" class="desc_dot"></i>
      </div>
    </div>
    <div class="info-key">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div class="info-list">
      <img
        :src="item"
        alt=""
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :keys="index"
        @load="imgLoad"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      if (++this.counter === this.imagesLength) {
        this.$emit("imgeLoad");
      }
    }
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
};
</script>
<style scoped>
.goods-info {
  font-size: 0.68rem;
}
.clear-fix {
  font-size: 0.6rem;
  padding: 0.42rem 0.34rem;
}
.desc_line {
  width: 3.5rem;
  height: 0.04rem;
  background-color: gray;
  position: relative;
}
.desc_dot {
  position: absolute;
  top: -0.1rem;
  display: inline-block;
  width: 0.21rem;
  height: 0.21rem;
  background-color: black;
  border-radius: 50%;
}
.desc {
  padding: 0.85rem 0;
  color: gray;
}
.info-key {
  padding: 0.42rem 0.34rem;
}
.info-list img {
  width: 100%;
}
</style>