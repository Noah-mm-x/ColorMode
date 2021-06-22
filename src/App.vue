<template>
  <router-view></router-view>
  <!-- <router-view v-slot="{ Component }">
    <keep-alive include="Index,Earn">
      <component class="view" :is="Component" />
    </keep-alive>
  </router-view> -->
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>
<style lang="less" src="/@less/reset.less">
</style>
