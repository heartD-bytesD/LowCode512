<script setup lang="ts">
import {router} from "@/router";
import {useProjectStore, useHttpReqStore} from "@/store";
import {useRouter} from "vue-router";
import axios from "axios";
import "./EditorHeader.less"

const projectStore = useProjectStore();
const httpReqStore = useHttpReqStore();
const route = useRouter();

function onSave() {
  projectStore.saveProject();
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
  httpReqStore.postReqJson(reqJson).then((response) => {
    let responseJson = response.data
    if (!responseJson.status || responseJson.status != 200) {
      console.log(`请求失败 ${responseJson}`)
      alert("保存失败")
      return
    }
    alert(`保存成功`)
    router.push(`publish/${responseJson.project_id}`)
  })
}
</script>


<template>
  <div class="editor-content-header">
    <a-button type="outline" @click="onCopy">复制</a-button>
    <a-button type="outline" @click="onPaste">粘贴</a-button>
    <a-button type="outline" @click="onCut">剪切</a-button>
    <a-button type="outline" @click="onRemove" status='danger'>删除</a-button>
    <a-button type="outline" @click="onUndo">后退</a-button>
    <a-button type="outline" @click="onRedo">前进</a-button>
    <a-button type="outline" @click="onSave">保存</a-button>
    <a-button type="outline" @click="onPreview">预览</a-button>
    <a-button type="outline" @click="onReset" status="danger">重置</a-button>
    <a-button type="outline" @click="onPublish">发布</a-button>
  </div>
</template>
