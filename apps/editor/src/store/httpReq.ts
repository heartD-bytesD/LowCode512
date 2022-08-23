import { defineStore } from "pinia";
import { PageElement } from '@lowcode512/shared'
import axios from "axios";
import { useProjectStore } from "@/store";

const backend_data_url = "/api/fetchProjectData"
const backend_image_url = "/api/fetchImage";

export type DataReqJson = {
    type: string,
    project_id: string,
    project_data: string,
    note: string
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

    return {
        produceReqJson,
        postReqJson,
        uploadPicture
    }
})