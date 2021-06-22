<template>
  <div id="earn-total">
    <div class="price-box">
      <div class="total-wrap">
        <div class="txt-wrap">
          <p>实际总收益(元)</p>
          <p>最后统计至昨日</p>
        </div>
        <p class="val">3,789.00</p>
        <img class="bg" src="/@img/earn/t.png" alt="banner">
      </div>
      <div class="cash-wrap">
        <a href="javascript:;" class="item" @click="handleCashShow">
          <p class="val">789.00</p>
          <div class="txt">
            <p>可提现金额</p>
            <img src="/@img/earn/arrow-right.png" alt="">
          </div>
        </a>
        <div class="line"></div>
        <a href="javascript:;" class="item" @click="handleCashShow">
          <p class="val">789.00</p>
          <div class="txt">
            <p>已提现金额</p>
            <img src="/@img/earn/arrow-right.png" alt="">
          </div>
        </a>
      </div>
      <div class="info-wrap">
        <div class="txt-wrap">
          <p>
            1、提现需到 <span>健康宝</span><img class="q" src="/@img/earn/q.png" alt="success"/> 进行，您还未在健康宝进行认证，认证通过之后，每月10号可提现金额将自动转入健康宝。
          </p>
          <p>2、必须使用在平安健康号创作者平台注册使用的手机号和身份证号来认证开通健康宝，否则不可进行提现。</p>
        </div>
        <a class="link" href="javascript:;">健康宝认证流程</a>
      </div>
      <!-- <div class="info-wrap">
        <div class="txt-wrap">
          <p>您已通过 <span>健康宝</span> 认证，每月10号可提现金额将自动转入健康宝，请到“平安健康App-健康宝”模块进行提现。</p>
        </div>
      </div> -->
    </div>
    <!-- <div class="no-data-wrap">
      <subtitle class="title">提现记录</subtitle>
      <div class="no-record-box">
        <img src="/@img/earn/no-data.png" alt="nodata">
      </div>
    </div> -->
    <subtitle class="title">提现记录</subtitle>
    <ul class="record-list">
      <li>
        <img class="success" src="/@img/earn/success-tmp.png" alt="success">
        <!-- <img class="fail" src="/@img/earn/fail-tmp.png" alt="fail"> -->
        <div class="info-wrap">
          <p class="bold">打款日期：2020/02/23 12:23</p>
          <ul>
            <li>
              <p>打款金额(税后)</p>
              <p>¥1233.32</p>
            </li>
            <li>
              <p>税前总金额</p>
              <p>¥1233.32</p>
            </li>
            <li>
              <p>扣税金额</p>
              <p>¥1233.32</p>
            </li>
          </ul>
        </div>
        <a class="link" href="javascript:;" @click="handlePayShow">
          <p class="txt">查看详情</p>
          <img src="/@img/earn/arrow-right.png" alt="arrow" />
        </a>
      </li>
    </ul>

    <pa-popup ref="cashPopupRef" name="可提现金额" class="cash-popup">
      <div class="content">
        <div class="card">
          <div class="txt-wrap">
            <p>可提现金额合计(元)</p>
            <p>最后统计至昨日</p>
          </div>
          <p class="val">3,789.00</p>
        </div>
        <ul class="list">
          <li>
            <p>文章(含税)</p>
            <p>¥1233.32</p>
          </li>
          <li>
            <p>小视频(含税)</p>
            <p>¥1233.32</p>
          </li>
          <li>
            <p>直播(含税)</p>
            <p>¥1233.32</p>
          </li>
          <li>
            <p>师徒活动一期(含税)</p>
            <p>¥1233.32</p>
          </li>
          <li>
            <p>续保活动(含税)</p>
            <p>¥1233.32</p>
          </li>
          <li>
            <p>直播补贴(含税)</p>
            <p>¥1233.32</p>
          </li>
        </ul>
      </div>
    </pa-popup>
    <pa-popup ref="payPopupRef" name="可提现金额" class="pay-popup">
      <div :class="['content',{'has-suc': false,'has-fail': true}]">
        <!-- <img class="success" src="/@img/earn/success.png" alt="success"> -->
        <div class="fail">
          <img class="bg" src="/@img/earn/fail.png" alt="fail">
          <p class="txt">
            <span>失败原因：</span>账号不符，账号不存账号不符，账号不存账号不符，账号不存
          </p>
        </div>
        <ul class="record-detail-list">
          <li>
            <p class="bold">打款方式：银行卡(7637)</p>
            <p class="bold">打款日期：2020/02/23 12:23</p>
            <ul class="top-data-list">
              <li>
                <p>打款金额(税后)</p>
                <p>¥1233.32</p>
              </li>
              <li>
                <p>税前总金额</p>
                <p>¥1233.32</p>
              </li>
              <li>
                <p>扣税金额</p>
                <p>¥0</p>
              </li>
            </ul>
            <ul class="bottom-data-list">
              <li>
                <p>文章(含税)</p>
                <p>¥1233.32</p>
              </li>
              <li>
                <p>小视频(含税)</p>
                <p>¥1233.32</p>
              </li>
              <li>
                <p>直播(含税)</p>
                <p>¥1233.32</p>
              </li>
              <li>
                <p>师徒活动一期(含税)</p>
                <p>¥1233.32</p>
              </li>
              <li>
                <p>续保活动(含税)</p>
                <p>¥1233.32</p>
              </li>
              <li>
                <p>直播补贴(含税)</p>
                <p>¥1233.32</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </pa-popup>
  </div>
</template>

<script>
import subtitle from "../subtitle.vue";
import { defineComponent } from 'vue'
import paPopup from "../popup/popup.vue"
import {
  cashPopupFnc,
  payPopupFnc
} from "../total/total"
export default defineComponent({
  setup() {
    return {
      ...cashPopupFnc(),
      ...payPopupFnc()
    }
  },
  components: {
    subtitle,
    paPopup
  },
})
</script>

<style lang="less" scoped src="./total.less">
</style>