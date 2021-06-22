<template>
  <div class="title">{{value}}
    <van-button type="primary" @click="add(value)">主要按钮</van-button>
  </div>

</template>

<script>
import { add } from './index'
import { Button } from 'vant'
export default {
  components: {
    [Button.name]: Button
  },
  setup() {
    let value = 112121212;
    return { value, add }
  },
  mounted() {
    console.log(this)
    const ajax = () => {
      this.$https.post(this.$api.config, {
        url: '/'
      }).then(res => {
        console.log(res)
      })
    }
    ajax()
  }

}
</script>
<style lang="less" scoped src="./index.less">
@import '~/@less/common.less';
</style>