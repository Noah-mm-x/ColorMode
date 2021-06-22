<template>
  <div class="subtitle">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'subtitle',
})
</script>

<style lang="less" scoped >
.subtitle {
  position: relative;
  padding-left: 0.16rem;
  font-size: 0.4rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  color: #333333;
  line-height: 0.4rem;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 0.08rem;
    height: 0.37rem;
    background: #ff6600;
    border-radius: 0.04rem;
  }
}
</style>