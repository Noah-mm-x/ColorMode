<template>
  <div id="earn">
    <div class="nav-wrap">
      <a class="active" href="javascript:;" @click="change">收益分析</a>
      <a href="javascript:;">内容数据</a>
      <div class="line"></div>
    </div>
    <div :class="['content',{'gray': currentTabComponent == 'total','white': currentTabComponent == 'details'}]">
      <div v-if="currentTabComponent == 'total'" class="bg"></div>
      <div class="tab-wrap">
        <a v-for="(item,index) in tabList" :key="index" :class="{'active': curTabIndex == index}" href="javascript:;" @click="handleTabClick(index)">{{item.txt}}</a>
        <div class="slide" :style="slideStyle"></div>
      </div>
      <component :is="currentTabComponent"></component>
    </div>
  </div>
</template>

<script>
import total from '/@component/earn/total/total.vue'
import { defineAsyncComponent } from 'vue'
import details from '/@component/earn/details/details.vue'
import { tabFnc } from "../earn/earn";
export default {
  setup() {
    return {
      ...tabFnc()
    }
  },
  components: {
    total,
    details
  }
}
</script>
<style lang="less" scoped src="./earn.less">
</style>