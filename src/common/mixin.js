import {debounce} from 'components/common/utils.js';

export const itemListenerMixin = {
  data() {
    return {
      itemImagListener: null
    }
  },

  mounted () {
    let refresh = debounce(this.$refs.scroll.refresh, 100)

      this.itemImagListener = () => {
        refresh()
      }
      this.$bus.$on('itemImgLoad', this.itemImagListener)
      console.log('混入其中');
  }
}