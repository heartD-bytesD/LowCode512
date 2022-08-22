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
import { useHttpReqStore } from "@/store";
import { IProject } from "@lowcode512/shared";
import { materialMap } from "@/data";
import "./index.less";
import {router} from "../../router"
import {onBeforeMount, ref} from "vue";

// const {loading, pages} = useMaterial()
let project = ref(JSON.parse(localStorage.getItem("__project") || "{}") as IProject)
let page_index = ref(0)
let httpReqStore = useHttpReqStore();
onBeforeMount(async () => {
  const backend_url = "/api/fetchProjectData"
  const reqJsonTemplate = {
    type: "read",
    project_id: "",
    project_data: "",
    note: ""
  }
  // router.currentRoute.value.params有可能是空对象
  let id = router.currentRoute.value.params.id || 0;
  let page = router.currentRoute.value.params.page || 0;
  console.log("page: " , router.currentRoute)
  if(!id){
    return
  }
  let reqJson = httpReqStore.produceReqJson()
  reqJson.project_id = id as string
  reqJson.type = "read"
  httpReqStore.postReqJson(reqJson).then((response) => {
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
    // 这块page是string | number | string[]，留意一下是否需要更严格的类型检验
    page_index.value = page as number;
  })
})

</script>

<style scoped></style>
