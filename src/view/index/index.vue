<template>
  <div id="index">
    <img
      class="img"
      src="../../assets/img/1.jpeg"
      alt=""
      srcset=""
    >
    <canvas
      id="canvas"
      ref="canvas"
    ></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  components: {},
  setup() {
    const canvas = ref(null);
    onMounted(() => {
      const ctx = canvas.value.getContext("2d");
      // 存储canvas的真实大小
      let canvasWidth, canvasHeight;
      const imgWidth = 200;
      const imgHeight = 200;
      const dpi = window.devicePixelRatio || 1;

      canvas.value.style.width = imgWidth + "px";
      canvas.value.style.height = imgHeight + "px";

      canvas.value.width = imgWidth * dpi 
      canvas.value.height = imgHeight * dpi 

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/@img/1.jpeg";
      img.onload = () => {
        ctx.scale(dpi,dpi)
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        const imageData = ctx.getImageData(0, 0, imgWidth , imgHeight);
        const data = imageData.data;
        // console.log(data);
      };
    });
    // const canvas = document.getElementById("canvas");
    // const ctx = canvas.getContext("2d");
    // const img = new Image();
    // img.crossOrigin = "anonymous";
    // img.src = "/@img/1.jpeg";
    return {
      canvas,
    };
  },
};
</script>
<style lang="less" scoped src="./index.less">
</style>