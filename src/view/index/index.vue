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
    <p>上面图：</p>
    <canvas ref="canvas"></canvas>
    <p> 下面图：</p>
    <canvas ref="canvasOrgin"></canvas>
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
      canvasOrgin: null,
      ctxOrgin: null,
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
      ],
      data: null,
      imageData: null,
      originData: null,
      imageOriginData: null,
    });
    onMounted(async () => {
      state.img = await imgOnload();
      initCanvas();
      initOriginCanvas();
      normal();
    });
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
      state.canvasOrgin.style.width = imgWidth + "px";
      state.canvasOrgin.style.height = imgHeight + "px";
      state.canvasOrgin.width = imgWidth * dpi;
      state.canvasOrgin.height = imgHeight * dpi;

      state.ctxOrgin = state.canvasOrgin.getContext("2d");
      state.ctxOrgin.scale(dpi, dpi);
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
      state.ctxOrgin.drawImage(state.img, 0, 0, imgWidth, imgHeight);
      state.imageOriginData = state.ctxOrgin.getImageData(
        0,
        0,
        imgWidth,
        imgHeight
      );
      state.originData = state.imageOriginData.data;
    };
    // 变暗，取小值
    const darken = (val) => {
      state.ctxOrgin.fillStyle = val || "#000000";
      state.ctxOrgin.fillRect(0, 0, imgWidth, imgHeight);
      let data = state.data;
      let originData = state.originData;
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.min(data[i], originData[i]);
        data[i + 1] = Math.min(data[i + 1], originData[i + 1]);
        data[i + 2] = Math.min(data[i + 2], originData[i + 2]);
      }
      state.ctx.putImageData(state.imageData, 0, 0);
    };
    const handleChange = () => {
      switch (state.selectVal) {
        case "darken":
          darken();
          break;

        default:
          normal();
          console.log("hhas");
          break;
      }
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