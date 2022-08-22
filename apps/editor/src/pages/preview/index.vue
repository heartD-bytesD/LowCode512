<template>
    <div class="page">
        <div>{{project}}</div>
        <div v-if="!project">loading...</div>
        <div
            v-else
            v-for="item in project.pages[page_index].elements"
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
</template>

<script setup lang="ts">
import { IProject } from "@lowcode512/shared";
import { materialMap } from "@/data";
import { useMaterial } from "./material";
import "./index.less";
import axios from "axios";
import {router} from "../../router.ts"
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {produceReqJson, postReqJson} from "@/store/httpReq";

// const {loading, pages} = useMaterial()
let project = ref(JSON.parse(localStorage.getItem("__project") || "{}") as IProject)
let page_index = ref(0)

onBeforeMount(async () => {
  const backend_url = "/api/fetchProjectData"
  const reqJsonTemplate = {
    type: "read",
    project_id: "",
    project_data: "",
    note: ""
  }
  let id = router.currentRoute.value.params.id
  let page = router.currentRoute.value.params.page
  if(!id){
    return
  }
  let reqJson = produceReqJson()
  reqJson.project_id = id
  reqJson.type = "read"
  postReqJson(reqJson).then((response) => {
    let responseJson = response.data
    if (!responseJson.status || responseJson.status != 200) {
      console.log(`请求失败 ${responseJson}`)
      return
    }
    let projectTmp = JSON.parse(responseJson.project_data) as IProject
    if(!projectTmp || !projectTmp.pages ||!projectTmp.pages.length){
      return
    }
    project.value = projectTmp
    if(!page || page < 0 || page >= project.value.pages.length){
      return
    }
    page_index.value = page
  })
})

</script>

<style scoped></style>
