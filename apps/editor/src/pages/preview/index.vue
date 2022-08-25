<template>
    <div class="page">
      <a-alert v-if="loading" :title="loadingAlert"></a-alert>
      <div
          v-else
          v-for="item in page.elements"
          :key="item.id"
          :style="{
                position: 'absolute',
                left: item.style.left + 'px',
                top: item.style.top + 'px',
                width: item.style.width + 'px',
                height: item.style.height + 'px',
            }"
      >
        <component
            :is="materialMap[item.mId].name"
            v-bind="item.props"
        ></component>
      </div>
    </div>
  <a-card v-if="!loading" :title='project.name + " - 第" + (pageIndex + 1) + "页 - " + page.name' >
      <a-menu class="ls-preview-menu">
        <a-menu-item v-for="[mIndex, mPage] in project.pages.entries()" @click="pageChange(mIndex)">
          <a>第{{mIndex+1}}页 - {{mPage.name}}</a>
        </a-menu-item>
      </a-menu>
  </a-card>
</template>

<script setup lang="ts">
import {useHttpReqStore} from "@/store";
import {IProject, Project} from "@lowcode512/shared";
import {getMaterialRenderFun, materialMap} from "@/data";
import "./index.less";
import {router} from "@/router"
import {onBeforeMount, ref} from "vue";
import {loadMaterial} from "@/utils";
import app from "@/app";

// 加载中的状态
let loading = ref(true)
// 加载中或出错的文字提示
let loadingAlert = ref("加载中...")
// 显示的页面数据
let page = ref({name: "", elements:[]})
// 当前页面对应的项目数据
let project = ref(Project.create())
// 当前页面对应的项目数据中的页码
let pageIndex = ref(0)
// 是否为预览页面
let isPreviewPage = ref(window.location.href.includes("preview"))
// 如果是，加载本地存储
if(isPreviewPage.value){
  project.value = JSON.parse(localStorage.getItem("__project") || "{}") as IProject
  page.value = project.value.pages[pageIndex.value]
}

// 读取页面参数
// router.currentRoute.value.params有可能是空对象
let projectId = null
if(router.currentRoute.value.params){
  projectId = router.currentRoute.value.params.id;
  pageIndex.value = Number(router.currentRoute.value.params.pageIndex) || 0;
}

let httpReqStore = useHttpReqStore();
// 加载项目json文件
const loadOnlineJson = async () => {
  console.log("pageRouter: " , router.currentRoute)
  if(!projectId){
    return
  }
  let reqJson = httpReqStore.produceReqJson()
  reqJson.project_id = projectId as string
  reqJson.type = "read"
  return httpReqStore.postReqJson(reqJson).then((response) => {
    let responseJson = response.data
    if (!responseJson.status || responseJson.status != 200) {
      console.log(`请求失败 ${responseJson}`)
      return
    }
    console.info("读取到远程保存的项目数据: " , responseJson.project_data)
    let projectTmp = JSON.parse(responseJson.project_data) as IProject
    if(!projectTmp || !projectTmp.pages ||!projectTmp.pages.length){
      return
    }
    if(pageIndex.value >= projectTmp.pages.length){
      throw new DOMException("不存在此页")
    }
    // 这块pageIndex是string | number | string[]，留意一下是否需要更严格的类型检验
    project.value = projectTmp
  })
}
// 加载页面脚本
onBeforeMount(async () => {
  loadOnlineJson().then(() => {
    const pageTmp = project.value.pages[pageIndex.value]
    console.log("当前页面使用的项目数据: ", project.value)
    const materials = pageTmp.elements.map(item =>
        materialMap[item.mId]
    )
    loading.value = true;
    Promise.all(Object.values(materials).map(loadMaterial)).then(() => {
      loading.value = false;
      materials.forEach(m => {
        app.component(m.name, getMaterialRenderFun(m))
      })
      page.value = pageTmp
    });
  }, (err) => {
    loadingAlert.value = `${err}`
  })
})

// 切换页面
let pageChange = function (nextPageIndex) {
  if(nextPageIndex == pageIndex.value){
    return
  }
  if(isPreviewPage.value){
    window.location.assign(`/preview/${nextPageIndex}`)
  }else{
    window.location.assign(`/publish/${projectId}/${nextPageIndex}`)
  }
}

</script>

<style scoped>
/* 菜单淡入淡出 */
.ls-preview-menu{
  opacity: 0;
  transition: opacity 1.0s;
}
.ls-preview-menu:hover{
  opacity: 100%;
  transition: opacity 1.0s;
}
</style>
