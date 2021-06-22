<template>
  <van-popup v-model:show="showStatus" round position="bottom" :close-on-popstate="true" @click-overlay="handleOverlayHide">
    <div class="title-wrap">
      <a v-if="hasBack" href="javascript:;" class="back" @click.stop="handleBack">
        <van-icon name="arrow-left" color="#999999" size="20" />
      </a>
      <p class="title">{{name}}</p>
      <a href="javascript:;" class="cancel" @click.stop="handleHide">
        <van-icon name="cross" color="#999999" size="20" />
      </a>
    </div>
    <slot></slot>
  </van-popup>
</template>

<script>
import { Popup, Icon } from 'vant';
import { ref, defineComponent } from 'vue';
export default defineComponent({
  setup(props, { emit, slots }) {
    const showStatus = ref(false)
    const handleOverlayHide = () => {
      emit('hide')
    }
    const handleShow = () => {
      showStatus.value = true
    }
    const handleHide = () => {
      showStatus.value = false
    }
    const handleBack = () => {
      emit('back')
    }
    return {
      handleOverlayHide,
      showStatus,
      handleShow,
      handleHide,
      handleBack
    }
  },
  props: {
    // 不能放在prop里面，因为vant，会设置显示的值
    // showStatus: {
    //   type: Boolean,
    //   default: false
    // },
    name: {
      type: String,
      default: '健康号'
    },
    hasBack: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon
  },
})
</script>

<style lang="less" scoped src="./popup.less">
</style>