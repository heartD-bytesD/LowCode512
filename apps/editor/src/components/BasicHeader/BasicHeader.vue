<template>
  <div class="basic-header">
    <!-- Header  按钮  -->
    <a-button-group class="toolbar">
      <a-button type="primary">
        <icon-left />
        返回
      </a-button>
      <a-button type="primary">
        前进
        <icon-right />
      </a-button>
      <a-button type="primary">预览</a-button>
      <a-button type="primary">保存</a-button>
      <a-button type="primary">清空画布</a-button>
      <a-button type="primary" @click="isDark = !isDark">
        <icon-settings />
        主题
      </a-button>
    </a-button-group>


  </div>
</template>

<script setup lang="ts">
import './BasicHeader.less';
import { ref } from "vue"
const isDark = ref(false)
if (isDark) {
  // 设置为暗黑主题
  document.body.setAttribute('arco-theme', 'dark')
} else {
  // 恢复亮色主题
  document.body.removeAttribute('arco-theme');
}

</script>

<style>
</style>
