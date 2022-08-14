<template>
    <div class="basic-layout">
        <a-layout style="height: 100%;">
            <!-- header -->
            <a-layout-header>
                <div class="basic-layout-header">
                    <BasicHeader />
                </div>
            </a-layout-header>
            <a-layout>
                <a-layout-sider>
                    <!-- left -->
                    <div>
                        组件部分
                    </div>
                </a-layout-sider>
                <a-layout-content>

                    <!-- 内容展示部分 -->
                    <router-view></router-view>
                    <!-- <div class="basic-layout-content">
                        <slot> </slot>
                    </div> -->
                </a-layout-content>
                <a-layout-sider>
                    <!-- right coding 部分 -->
                    代码部分
                </a-layout-sider>
            </a-layout>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import BasicHeader from "../BasicHeader/BasicHeader.vue";
import "./BasicLayout.less";
</script>

<style scoped lang="less">
.basic-layout {
    height: 100%;

    .arco-layout-content,
    .arco-layout-header,
    .arco-layout-sider {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 16px;
        font-stretch: condensed;
    }

    .arco-layout-content {
        background-color: #C3E7FE;
    }

    .arco-layout-sider {
        background-color: #3491FA;
    }
}
</style>
