<template>
  <div id="app">
    <BaseButton color="brand-brightPurple">Button</BaseButton>
    <BaseButton color="brand-brightGreen">Button</BaseButton>
    <!-- 其他按鈕 -->
  </div>
</template>
<script>
import BaseButton from "./components/global/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
};
</script>
