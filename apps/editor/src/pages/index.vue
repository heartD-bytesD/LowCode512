<template>
  <a-alert v-if="loading" :title="loadingAlert"></a-alert>
  <a-card>
    <a-button @click="indexMenuOnGotoEditor">进入编辑器</a-button>
  </a-card>
  <a-card title="已发布的项目列表">
  <a-menu>
    <a-menu-item v-for="projectJson in projectJsons">
      <p>{{projectJson.project_id}} - {{indexMenuGetProjectName(projectJson)}} - 创建时间: {{projectJson.project_create_time}} - 上次更新时间: {{projectJson.project_last_edit_time}}</p>
      <a-button @click="MenuOnEdit(projectJson, router)">编辑</a-button>
      <a-button @click="MenuOnPreview(projectJson, router)">预览</a-button>
    </a-menu-item>
  </a-menu>
  </a-card>
</template>

<script setup lang="ts">
import {ProjectDatabaseJson, useHttpReqStore, useProjectStore} from "@/store";
import {onBeforeMount, ref} from "vue";
import {MenuOnEdit, MenuOnPreview} from "@/utils";
import {router} from "@/router"

let project = useProjectStore()
let httpReqStore = useHttpReqStore()
let projectJsons = ref<ProjectDatabaseJson[]>([])
let loading = ref(true)
let loadingAlert = "加载中……"

onBeforeMount(async () => {
  httpReqStore.fetchAllProjects().then((result) => {
    loading.value = false
    projectJsons.value = result.data
    projectJsons.value.sort((j1, j2) => {
      if(j1.project_last_edit_time > j2.project_last_edit_time)
        return -1
      return 1
    })
  }, (err) => {
    alert(`加载项目失败: ${err}`)
  })
})



let indexMenuGetProjectName = function(project_json: ProjectDatabaseJson){
  let reg = /{"name":"([^"]+)","description"/
  let regResult = project_json.project_data.match(reg)
  if(!regResult || !regResult.length || regResult.length < 2){
    return "-"
  }
  return regResult[1]
}

let indexMenuOnGotoEditor = function (){
  if(project.projectId){
    router.push("/editor/" + project.projectId)
    return
  }
  router.push("/editor")
}


// route.push("/editor")
</script>

<style>
</style> 
