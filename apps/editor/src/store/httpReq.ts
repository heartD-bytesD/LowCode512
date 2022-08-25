import { defineStore } from "pinia";
import { PageElement } from '@lowcode512/shared'
import axios from "axios";
import { useProjectStore } from "@/store";

const backend_data_url = "/api/fetchProjectData"
const backend_image_url = "/api/fetchImage";
export const PROJECT_METHOD_READ = "read"
export const PROJECT_METHOD_SAVE = "save"

export type DataReqJson = {
    type: string,
    project_id: string,
    project_data: string,
    note: string
}

export type DataResponseJson = {
    status: number,
    type: string,
    project_id: string,
    project_data: string,
    project_create_time: string,
    project_last_edit_time: string,
    note: string
}

export type ProjectDatabaseJson = {
    project_id: string,
    project_data: string,
    project_create_time: string,
    project_last_edit_time: string
}

export const useHttpReqStore = defineStore("httpReq", () => {

    function produceReqJson(type?, id?, data?, note?) {
        return {
            type: type || "",
            project_id: id || "",
            project_data: data || "",
            note: note || ""
        } as DataReqJson
    }

    function postReqJson(reqJson: DataReqJson){
        if(reqJson.type == PROJECT_METHOD_READ && localStorage[reqJson.project_id]){
            return new Promise((resolve, _) => {
                console.log("[Experimental feature] Using mocked response that was previously cached.")
                const mockedDatabaseJson = JSON.parse(localStorage[reqJson.project_id]) as ProjectDatabaseJson
                const mockedResponseDataJson: DataResponseJson = {
                    status : 200,
                    type : "ack",
                    project_id: mockedDatabaseJson.project_id,
                    project_data: mockedDatabaseJson.project_data,
                    project_create_time: mockedDatabaseJson.project_create_time,
                    project_last_edit_time: mockedDatabaseJson.project_last_edit_time,
                    note: ""
                }
                const mockedResponse = {
                    status: 200,
                    data: mockedResponseDataJson
                }
                resolve(mockedResponse)
            })
        }
        return axios({
            method: "post",
            data: JSON.stringify(reqJson),
            url: backend_data_url,
            headers: {
                "Content-Type": "application/json"
            },
            transformRequest: [
                data => {return data}
            ]
        }).then((result) => {
            // 保存时在原地更新后写回
            let responseJson = result.data as DataResponseJson
            if(responseJson.status != 200){
                return result
            }
            if(reqJson.type == PROJECT_METHOD_SAVE){
                // 由于渲染不需要创建时间和更新时间信息，没有进行缓存
                console.log("缓存因单个post请求更新");
                localStorage[responseJson.project_id] = JSON.stringify({
                    project_id : responseJson.project_id,
                    project_data: reqJson.project_data,
                    project_create_time: responseJson.project_create_time,
                    project_last_edit_time: responseJson.project_last_edit_time
                } as ProjectDatabaseJson)
            }
            return result
        }, (err) => {
            return err
        })
    }

    function uploadPicture(element: PageElement) {
        const projectStore = useProjectStore();
        let formData = new FormData();
        let imagefile = document.querySelector(
            "#image_input"
        ) as HTMLInputElement;
        formData.append("image", imagefile.files[0]);
        axios.post(backend_image_url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => {
            const link = res.data;
            projectStore.changeElementProps({ src: link, local: true }, element);
        });
    }

    function fetchAllProjects(){
        return axios({
            method: "get",
            url: "/api/fetchProjectDataAll",
            transformRequest: [
                data => {return data}
            ]
        }).then((result) => {
            try{
                for(let projectJson of result.data){
                    localStorage[projectJson.project_id] = JSON.stringify(projectJson)
                }
                console.log("缓存已更新")
            }catch (e){
                console.log("缓存失败")
            }
            return result
        }, (err) => {
            return err
        })
    }

    return {
        produceReqJson,
        postReqJson,
        uploadPicture,
        fetchAllProjects
    }
})