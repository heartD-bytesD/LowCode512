<script setup lang="ts">
import { computed } from "vue";

const { title, color, round, barSize, textSize, value, opacity } = defineProps<{
    title: string;
    color: string;
    size: number;
    round: boolean;
    barSize: number;
    textSize: number;
    value: number;
    opacity: number;
}>();

const radius = computed(() => (round ? 0 : 10));
</script>

<template>
    <div class="lc-div">
        <div class="lc-slider">
            <div
                :style="{
                    fontSize: textSize + 'px',
                }"
            >{{ title }}</div>
            <input
                type="range"
                min="1"
                max="100"
                :value="value"
                class="slider"
                :style="{
                    '--color': color,
                    '--radius': radius,
                    '--opacity': opacity,
                    '--barSize': barSize,
                }"
            />
        </div>
    </div>
</template>
