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
        {
          key: "colorBurn",
          val: "颜色加深",
        },
        {
          key: "colorDodge",
          val: "颜色减淡",
        },
        {
          key: "linearBurn",
          val: "线形加深",
        },
        {
          key: "linearDodge",
          val: "线形减淡",
        },
        {
          key: "softLight",
          val: "柔光",
        },
      ],
      data: null,
      imageData: null,
      originData: null,
      imageOriginData: null,
      ways: {},
      cache: new Map()
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
      // 变暗
      // B<=A 则 C=B B>=A 则 C=A
      darken: (a, b) => {
        return Math.min(a, b);
      },
      // 变亮
      // B<=A 则 C=A B>A 则 C=B
      lighten: (a, b) => {
        return Math.max(a, b);
      },
      //  正片叠底
      // C=(A×B)/255
      multiply: (a, b) => {
        return parseInt((a * b) / 255);
      },
      //  滤色
      // C=255-(A反相×B反相)/255
      screen: (a, b) => {
        return 255 - parseInt((reverse(a) * reverse(b)) / 255);
      },
      //  颜色加深
      // C=A-(A反相×B反相)/B
      colorBurn: (a, b) => {
        return a - parseInt((reverse(a) * reverse(b)) / 255);
      },
      // 颜色减淡
      // C=A+(A×B)/B反相
      colorDodge: (a, b) => {
        return a + parseInt((a * b) / reverse(b));
      },
      // 线形加深
      // C=A+B-255
      linearBurn: (a, b) => {
        return a + b - 255;
      },
      // 线形减淡
      // C=A+B
      linearDodge: (a, b) => {
        return a + b;
      },
      // 柔光
      // B<=128 则 C=(A×B)/128+(A/255)^2×(255-2B) B>128 则 C=(A×B反相)/128+sqrt(A/255)×(2B-255)
      softLight: (a, b) => {
        if (b < 128) {
          return (
            ((a * b) / 128) +
            (Math.pow(a / 255, 2)) * (255 - 2 * b)
          );
        } else {
          return (
            ((a * reverse(b)) / 128) +
            (Math.sqrt(a / 255)) * (2 * b - 255)
          );
        }
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
    const handleChange = () => {
      init(); 
      const form = state.ways[state.selectVal];
      cal(form);
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