import { ref, reactive} from 'vue'
import { dateMulFormat } from "/@js/tools.js";
export function typePopupFnc() {
  const popupRef = ref(null)
  const isCreater = ref(true)
  const currentTypeIndex = ref(0)
  const typeName = '选择类型'
  // 处理点击取消的问题 
  let indexTmp = 0
  let nameTmp = ''
  let paramTmp = ''
  const currentTypeObj = reactive({
    name: '创作收益',
    param: 1
  })
  const init =()=>{
    handleSwitchOne()
    currentTypeIndex.value = indexTmp ? indexTmp : 0
    if(indexTmp == 0) handleShowCreate()
    currentTypeObj.name = nameTmp ? nameTmp : '创作收益'
    currentTypeObj.param = paramTmp ? paramTmp : 1
  }
  const handleTypeShow = () => {
    popupRef.value.handleShow()
  }
  const typeOneList = reactive([
    {
      name: '创作收益',
      param: 1,
      title: '收益明细',
      time: '时间',
      isC: true,
    },
    {
      name: '师徒活动',
      param: 2,
      title: '收益明细',
      time: '时间',
      link: true
    },
    {
      name: '续保活动',
      param: 3,
      title: '收益明细',
      time: '续保时间',
      link: true
    },
    {
      name: '平台补贴',
      title: '补贴明细',
      time: '补贴时间',
      param: 4
    }
  ])
  const typeTwoList = reactive([
    {
      name: '一期(2020/8/15-2020/8/31)',
      param: 5
    },
    {
      name: '二期(2020/8/15-2020/8/31)',
      param: 6
    },
    {
      name: '三期(2020/8/15-2020/8/31)',
      param: 7
    },
    {
      name: '四期(2020/8/15-2020/8/31)',
      param: 8
    }
  ])
  let isOne = ref(true)
  const handleSwitchOne = () => {
    isOne.value = true
  }
  const handleSwitchTwo = () => {
    isOne.value = false
  }
  const handleOneSelect = (item,index) => {
    if(item.isC) {
      handleShowCreate()
    }else{
      handleHideCreate()
    }
    if (item.link) {
      handleSwitchTwo()
    }else{
      currentTypeIndex.value = index
      indexTmp = index
      currentTypeObj.name = item.name
      nameTmp = item.name
      currentTypeObj.param = item.param
      paramTmp = item.param
      popupRef.value.handleHide()
    }
  }
  const handleTwoSelect = (item) => {
    currentTypeObj.name = item.name
    nameTmp = item.name
    currentTypeObj.param = item.param
    paramTmp = item.param
    popupRef.value.handleHide()
    handleSwitchOne()
  }
  const handleShowCreate = ()=>{
    isCreater.value = true
  }
  const handleHideCreate = ()=>{
    init()
    isCreater.value = false
  }
  const handleHideTypePopup =()=>{
    init()
    popupRef.value.handleHide()
  }
  return {
    currentTypeIndex,
    isCreater,
    currentTypeObj,
    handleTypeShow,
    popupRef,
    typeName,
    typeOneList,
    typeTwoList,
    isOne,
    handleSwitchOne,
    handleSwitchTwo,
    handleOneSelect,
    handleTwoSelect,
    handleHideTypePopup
  }
}
export function typePickerFnc() {
  const showTypePicker = ref(false)
  const pickerTypeList = reactive([
    {
      name: '图文',
      param: 1
    },
    {
      name: '小视频',
      param: 2
    },
    {
      name: '直播',
      param: 3
    }
  ])
  const currentBottomTypeObj = reactive({
    name: '图文',
    param: 1
  })
  const handleShowTypePicker = () => {
    showTypePicker.value = true
  }
  const handleHideTypePicker = () => {
    showTypePicker.value = false
  }
  const handleTypeConfirm = (item) => {
    currentBottomTypeObj.name = item.name
    currentBottomTypeObj.param = item.param
    handleHideTypePicker()
  }
  const handleTypeCancel = () => {
    handleHideTypePicker()
  }
  return {
    currentBottomTypeObj,
    showTypePicker,
    pickerTypeList,
    handleShowTypePicker,
    handleTypeConfirm,
    handleTypeCancel
  }
}
export function pagePickerFnc() {
  const showPagePicker = ref(false)
  const pickerPageList = reactive([
    {
      name: '第一页',
      param: 1
    },
    {
      name: '第二页',
      param: 2
    },
    {
      name: '第三页',
      param: 3
    },
    {
      name: '第四页',
      param: 4
    }
  ])
  const currentBottomPageObj = reactive({
    name: '第一页',
    param: 1
  })
  const handleShowPagePicker = () => {
    showPagePicker.value = true
  }
  const handleHidePagePicker = () => {
    showPagePicker.value = false
  }
  const handlePageConfirm = (item) => {
    currentBottomPageObj.name = item.name
    currentBottomPageObj.param = item.param
    handleHidePagePicker()
  }
  const handlePageCancel = () => {
    handleHidePagePicker()
  }
  return {
    currentBottomPageObj,
    showPagePicker,
    pickerPageList,
    handleShowPagePicker,
    handlePageConfirm,
    handlePageCancel
  }
}
export function datePickerFnc() {
  const showDatePicker = ref(false)
  const currentDateTxt = ref('自定义')
  const handleShowDatePicker = () => {
    showDatePicker.value = true
  }
  const handleHideDatePicker = () => {
    showDatePicker.value = false
  }
  const handleDatePickerConfirm = (dates) => {
    const [start, end] = dates
    currentDateTxt.value = dateMulFormat(start,end,'至','')
    handleHideDatePicker()
  }
  return {
    showDatePicker,
    currentDateTxt,
    handleShowDatePicker,
    handleDatePickerConfirm
  }
}
export function introPopupFnc() {
  let showIntro = ref(false)
  const handleShowIntro = ()=>{
    showIntro.value = true
  }
  const handleCloseIntro = ()=>{
    showIntro.value = false
  }
  return {
    showIntro,
    handleShowIntro,
    handleCloseIntro
  }
}