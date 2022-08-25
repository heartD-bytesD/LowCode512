<script setup lang="ts">
import {router} from "@/router";
import {useProjectStore, useHttpReqStore} from "@/store";
import {useRouter} from "vue-router";
import "./EditorHeader.less"
import {onMounted} from "vue";

const projectStore = useProjectStore();
const httpReqStore = useHttpReqStore();
const route = useRouter();

function onSave() {
  projectStore.saveProject();
  alert("已暂存到本地缓存中")
}

function onPreview() {
  route.push("/preview");
}

function onReset() {
  projectStore.resetProject();
}

function onUndo() {
  projectStore.undo()
}

function onRedo() {
  projectStore.redo()
}

function onCopy() {
  projectStore.copyElement();
}

function onPaste() {
  projectStore.pasteElement();
}

function onRemove() {
  projectStore.removeElement();
}

function onCut() {
  projectStore.cutElement();
}

function onPublish() {
  //projectStore.saveProject();
  let projectData = projectStore.publishProject();
  let reqJson = httpReqStore.produceReqJson()
  reqJson.type = "save"
  reqJson.project_data = JSON.stringify(projectData)
  if(projectStore.projectId){
    reqJson.project_id = router.currentRoute.value.params.id as string
  }
  httpReqStore.postReqJson(reqJson).then((response) => {
    // 这样比较有风险，但我不想让缓存的实现侵入请求的实现
    let responseJson = response.data
    if (!responseJson.status || responseJson.status != 200) {
      console.log(`请求失败 ${responseJson}`)
      alert("保存失败")
      return
    }
    alert(`保存成功`)
    router.push(`/publish/${responseJson.project_id}`)
  })
}

function onBackToIndex(){
  router.push('/')
}

onMounted(() => {
  if(router.currentRoute.value.params && router.currentRoute.value.params.id){
    projectStore.projectId = router.currentRoute.value.params.id as string
  }
})
</script>


<template>
  <div class="editor-content-header">
    <a-button type="outline" @click="onUndo">后退</a-button>
    <a-button type="outline" @click="onRedo">前进</a-button>
    <a-button type="outline" @click="onCopy">复制</a-button>
    <a-button type="outline" @click="onPaste">粘贴</a-button>
    <a-button type="outline" @click="onCut">剪切</a-button>
    <a-button type="outline" @click="onRemove" status='danger'>删除</a-button>
    <a-button type="outline" @click="onPreview">预览</a-button>
    <a-button type="outline" @click="onReset" status='danger'>重置</a-button>
    <a-button type="outline" @click="onSave">暂存到本地</a-button>
    <a-button type="outline" @click="onPublish">保存并发布</a-button>
    <a-button type="outline" @click="onBackToIndex">返回主页</a-button>
  </div>
</template>
