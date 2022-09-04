<script setup lang="ts">
const props = defineProps<{
    bvid: string;
    page: number;
    high_quality: number;
    danmaku: number;
    events?: Record<string, any[]>;
}>();

</script>

<template>
  <iframe :src="'//player.bilibili.com/player.html?bvid=' + bvid + '&page=' + page + '&high_quality=' + high_quality + '&danmaku=' + danmaku" allowfullscreen="allowfullscreen" width="100%" height="100%" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts">
  </iframe>
</template>
