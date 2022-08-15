<script setup lang="ts">
import './EditorLayout.less'
import EditorLeft from '../EditorLeft/EditorLeft.vue';
import EditorRight from '../EditorRight/EditorRight.vue';
import EditorContent from '../EditorContent/EditorContent.vue';
</script>
<template>
    <a-layout class="editor-layout">
        <a-layout>
            <a-layout-sider >
                <EditorLeft />
            </a-layout-sider>
            <a-layout-content class="editor-content">
                <EditorContent />
            </a-layout-content>
            <a-layout-sider>
                <EditorRight />
            </a-layout-sider>
        </a-layout>
    </a-layout>
</template>
