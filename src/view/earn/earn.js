import { ref, watchEffect } from 'vue'
export function tabFnc() {
  let currentTabComponent = ref('')
  let curTabIndex = ref(1)
  let dis = ref(0)
  let slideStyle = ref('')
  const tabList = [
    {
      com: 'total',
      txt: '整体收益',
      param: 1,
    },
    {
      com: 'details',
      txt: '收益明细',
      param: 2,
    },
  ]
  // 这样写的好处：点击同一个，不用执行相同动作
  watchEffect(() => {
    dis.value = curTabIndex.value == 0 ? 0 : '94%'
    slideStyle.value = `transform: translateX(${dis.value});`
    currentTabComponent.value = tabList[curTabIndex.value].com
  })
  const handleTabClick = (index) => {
    curTabIndex.value = index
  }
  return {
    currentTabComponent,
    tabList,
    curTabIndex,
    slideStyle,
    handleTabClick
  }
}