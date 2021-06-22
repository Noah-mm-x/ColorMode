<template>
  <div id="earn-details">
    <div class="card-wrap">
      <div class="card">
        <p class="type">类型</p>
        <a class="link" href="javascript:;" @click="handleTypeShow">
          <p class="txt">{{currentTypeObj.name}}</p>
          <img class="img" src="/@img/earn/arrow.png" alt="arrow" />
        </a>
      </div>
    </div>
    <subtitle class="subtitle">收益概况</subtitle>
    <div class="data-list-wrap">
      <ul class="data-list">
        <li v-for="n in 10" :key="n">
          <p class="type">图文收益(昨日)</p>
          <p class="val">3,789,012</p>
          <div class="txt">
            <p>累计</p>
            <p>2,672,342,123</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="title-wrap">
      <subtitle class="subtitle">{{typeOneList[currentTypeIndex].title}}</subtitle>
      <a v-show="isCreater" href="javascript:;" class="btn" @click="handleShowTypePicker">
        <p class="txt">{{currentBottomTypeObj.name}}</p>
        <img class="img" src="/@img/earn/arrow.png" alt="arrow">
      </a>
    </div>
    <div class="filter-wrap">
      <div class="type-wrap">
        <p class="type">{{typeOneList[currentTypeIndex].time}}：</p>
        <a class="btn" href="javascript:;" @click="handleShowDatePicker">{{currentDateTxt}}</a>
      </div>
      <!-- <a class="btn-page" href="javascript:;" @click="handleShowPagePicker">
        <p class="txt">{{currentBottomPageObj.name}}</p>
        <img class="img" src="/@img/earn/arrow.png" alt="arrow">
      </a> -->
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th class="left">日期</th>
          <th class="right">预估图文收益(元)</th>
          <th class="right">实际图文收益(元)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="left">2020/10/14</td>
          <td class="right">20918</td>
          <td class="right">20918</td>
        </tr>
        <tr>
          <td class="left">2020/10/14</td>
          <td class="right">20918</td>
          <td class="right">20918</td>
        </tr>
        <tr>
          <td class="left">2020/10/14</td>
          <td class="right">20918</td>
          <td class="right">20918</td>
        </tr>
      </tbody>
    </table>
    <pa-popup ref="popupRef" :name="typeName" class="type-popup" :hasBack="!isOne" @back="handleSwitchOne" @hide="handleHideTypePopup">
      <ul v-show="isOne" class="type-list">
        <li v-for="(item,index) in typeOneList" :key="index">
          <a href="javascript:;" @click="handleOneSelect(item,index)">
            <p class="txt">{{item.name}}</p>
            <img class="link" v-if="item.link" src="/@img/earn/arrow-right.png" alt="arrow" />
          </a>
        </li>
      </ul>
      <ul v-show="!isOne" class="type-list">
        <li v-for="(item,index) in typeTwoList" :key="index">
          <a href="javascript:;" @click="handleTwoSelect(item)">
            <p class="txt">{{item.name}}</p>
          </a>
        </li>
      </ul>
    </pa-popup>
    <van-popup v-model:show="showTypePicker" round position="bottom">
      <van-picker :columns="pickerTypeList" :confirm-button-text="'确定'" :value-key="'name'" @confirm="handleTypeConfirm" @cancel="handleTypeCancel"></van-picker>
    </van-popup>
    <!-- <van-popup v-model:show="showPagePicker" round position="bottom">
      <van-picker :columns="pickerPageList" :confirm-button-text="'确定'" :value-key="'name'" @confirm="handlePageConfirm" @cancel="handlePageCancel"></van-picker>
    </van-popup> -->
    <van-calendar v-model:show="showDatePicker" round type="range" @confirm="handleDatePickerConfirm" />
    <van-overlay :show="showIntro" :z-index="11" @click="handleCloseIntro">
      <div class="wrapper">
        <div class="intro-popup">
          <a class="close" href="javascript:;">
            <img src="../../../assets/images/earn/close.png" alt="close">
          </a>
          <p class="title">数据概况说明</p>
          <ul class="list">
            <li>1. 健康宝是平安健康险推出的官方专 属电子钱包,用户通过健康宝可以 享受快速提现、理赔金快速理赔等服务。</li>
            <li>2. 可以通过平安健康App快速开通。</li>
          </ul>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  Popup,
  Picker,
  Calendar,
  Overlay
} from 'vant'
import subtitle from "../subtitle.vue";
import paPopup from "../popup/popup.vue"
import {
  typePopupFnc,
  typePickerFnc,
  // pagePickerFnc,
  datePickerFnc,
  introPopupFnc
} from "./details.js";
export default defineComponent({
  setup() {
    return {
      ...typePopupFnc(),
      ...typePickerFnc(),
      // ...pagePickerFnc(),
      ...datePickerFnc(),
      ...introPopupFnc()
    }
  },
  components: {
    subtitle,
    paPopup,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Calendar.name]: Calendar,
    [Overlay.name]: Overlay
  },
})
</script>

<style lang="less" scoped src="./details.less">
</style>