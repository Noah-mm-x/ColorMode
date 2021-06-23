<template>
  <div id="index">
    <p>原图：</p>
    <img
      class="img"
      src="../../assets/img/1.jpeg"
      alt=""
      srcset=""
    >
    <p>上面图：</p>
    <canvas
      ref="canvas"
    ></canvas>
    <p> 下面图：</p>
    <canvas
      ref="canvasOrgin"
    ></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  components: {},
  setup() {
    const canvas = ref(null);
    const canvasOrgin = ref(null); 
    onMounted(() => {
      const ctx = canvas.value.getContext("2d");
      const ctxOrgin = canvasOrgin.value.getContext("2d");
      const imgWidth = 200;
      const imgHeight = 200;
      const dpi = window.devicePixelRatio || 1;
      console.log("dpi", dpi);
      canvasOrgin.value.style.width = imgWidth + "px";
      canvasOrgin.value.style.height = imgHeight + "px";
      canvasOrgin.value.width = imgWidth * dpi;
      canvasOrgin.value.height = imgHeight * dpi;
      ctxOrgin.scale(dpi, dpi);

      canvas.value.style.width = imgWidth + "px";
      canvas.value.style.height = imgHeight + "px";
      canvas.value.width = imgWidth * dpi;
      canvas.value.height = imgHeight * dpi;
      ctx.scale(dpi, dpi);

      
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/@img/1.jpeg";
      img.onload = () => {
        ctxOrgin.drawImage(img, 0, 0, imgWidth, imgHeight);
        const imageOriginData = ctxOrgin.getImageData(0, 0, imgWidth, imgHeight);
        const originData = imageOriginData.data;

        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
        const data = imageData.data;
        // console.log(data);
        // const pixel = () => {
        //   const gap = 3;
        //   const pow = 0.4;
        //   const width = imgWidth * pow;
        //   const height = imgHeight * pow;
        //   for (let h = 0; h < height; h += gap) {
        //     for (let w = 0; w < width; w += gap) {
        //       const pos = (width * h + w) * 4;
        //       const r = data[pos],
        //         g = data[pos + 1],
        //         b = data[pos + 2],
        //         a = data[pos + 3];
        //       ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        //       ctx.fillRect(w, h, 4, 4);
        //     }
        //   }
        // };
        // pixel();
        // const invert = ()=>{
        //   for (let i = 0; i < data.length; i+=4) {
        //     data[i] = 255 - data[i]
        //     data[i+1] = 255 - data[i]
        //     data[i+2] = 255 - data[i]
        //   }
        //   ctx.putImageData(imageData,0,0)
        // }
        // invert()
        const darken = () => {

        };
      };
    });
    // const canvas = document.getElementById("canvas");
    // const ctx = canvas.getContext("2d");
    // const img = new Image();
    // img.crossOrigin = "anonymous";
    // img.src = "/@img/1.jpeg";
    return {
      canvas,
      canvasOrgin
    };
  },
};
</script>
<style lang="less" scoped src="./index.less">
</style>