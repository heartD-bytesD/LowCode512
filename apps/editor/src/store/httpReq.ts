import axios from "axios";

const backend_data_url = "/api/fetchProjectData"

export type DataReqJson = {
    type: string,
    project_id: string,
    project_data: string,
    note: string
}

export const produceReqJson = function (type?, id?, data?, note?) {
    return {
        type: type || "",
        project_id: id || "",
        project_data: data || "",
        note: note || ""
    } as DataReqJson
}
export const postReqJson = function(reqJson: DataReqJson){
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
