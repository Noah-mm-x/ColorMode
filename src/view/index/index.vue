<template>
  <div id="index">
    <p>原图：</p>
    <img
      class="img"
      src="../../assets/img/2.jpeg"
      alt=""
      srcset=""
    >
    <select
      v-model="selectVal"
      @change="handleChange()"
    >
      <option
        v-for="(item,index) in list"
        :key="index"
        :value="item.key"
      >{{item.val}}</option>
    </select>
    <p>结果图：</p>
    <canvas ref="canvas"></canvas>
    <p>底图：</p>
    <canvas ref="canvasOrigin"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs } from "vue";
const imgWidth = 200;
const imgHeight = 200;
const dpi = window.devicePixelRatio || 1;
export default {
  components: {},
  setup() {
    const state = reactive({
      img: null,
      selectVal: "normal",
      canvas: null,
      ctx: null,
      canvasOrigin: null,
      ctxOrigin: null,
      list: [
        {
          key: "normal",
          val: "正常",
        },
        {
          key: "darken",
          val: "变暗",
        },
        {
          key: "lighten",
          val: "变亮",
        },
        {
          key: "multiply",
          val: "正片叠底",
        },
        {
          key: "screen",
          val: "滤色",
        },
      ],
      data: null,
      imageData: null,
      originData: null,
      imageOriginData: null,
      ways: {},
    });
    onMounted(async () => {
      state.img = await imgOnload();
      initCanvas();
      initOriginCanvas();
      normal();
    });
    const init = () => {
      state.ctx.clearRect(0, 0, imgWidth, imgHeight);
    };
    const initCanvas = () => {
      state.canvas.style.width = imgWidth + "px";
      state.canvas.style.height = imgHeight + "px";
      state.canvas.width = imgWidth * dpi;
      state.canvas.height = imgHeight * dpi;

      state.ctx = state.canvas.getContext("2d");
      state.ctx.scale(dpi, dpi);

      state.ctx.drawImage(state.img, 0, 0, imgWidth, imgHeight);
      state.imageData = state.ctx.getImageData(0, 0, imgWidth, imgHeight);
      state.data = state.imageData.data;
    };
    const initOriginCanvas = () => {
      state.canvasOrigin.style.width = imgWidth + "px";
      state.canvasOrigin.style.height = imgHeight + "px";
      state.canvasOrigin.width = imgWidth * dpi;
      state.canvasOrigin.height = imgHeight * dpi;

      state.ctxOrigin = state.canvasOrigin.getContext("2d");
      state.ctxOrigin.scale(dpi, dpi);
    };
    const imgOnload = (src) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src || "/@img/2.jpeg";
      return new Promise((res, rej) => {
        img.onload = () => {
          res(img);
        };
        img.onerror = () => {
          rej(img);
        };
      });
    };
    const normal = () => {
      state.ctxOrigin.drawImage(state.img, 0, 0, imgWidth, imgHeight);
      state.imageOriginData = state.ctxOrigin.getImageData(
        0,
        0,
        imgWidth,
        imgHeight
      );
      state.originData = state.imageOriginData.data;
      state.ctxOrigin.putImageData(state.imageData, 0, 0);

      state.ctx.drawImage(state.img, 0, 0, imgWidth, imgHeight);
      state.imageData = state.ctx.getImageData(0, 0, imgWidth, imgHeight);
      state.data = state.imageData.data;
      state.ctx.putImageData(state.imageData, 0, 0);
    };
    const reverse = (val) => {
      return 255 - val;
    };
    state.ways = {
      normal: normal,
      darken: (a, b) => {
        return Math.min(a, b);
      },
      lighten: (a, b) => {
        return Math.max(a, b);
      },
      multiply: (a, b) => {
        return parseInt((a * b) / 255);
      },
      screen: (a, b) => {
        return 255 - parseInt((reverse(a) * reverse(b)) / 255);
      },
    };
    const cal = (fnc) => {
      let data = state.data;
      let originData = state.originData;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = fnc(data[i], originData[i]);
        data[i + 1] = fnc(data[i + 1], originData[i + 1]);
        data[i + 2] = fnc(data[i + 2], originData[i + 2]);
      }
      state.ctx.putImageData(state.imageData, 0, 0);
    };
    // 变暗，取小值
    const handleChange = () => {
      init();
      const form = state.ways[state.selectVal];
      cal(form)
    };
    return {
      ...toRefs(state),
      handleChange,
    };
  },
};
</script>
<style lang="less" scoped src="./index.less">
</style>