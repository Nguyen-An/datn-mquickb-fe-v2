import { sendDelete, sendGet, sendPost } from "./hook";

export async function uploadIamge(params?: any) {
    const getData = await sendPost(`uploadfile/upload/avatar`, params)
    return getData
}

export async function getDataFiles(params?: any) {
    const data = await sendGet(`uploadfile/files`, params)
    return data
}

export async function uploadFileToS3(params?: any) {
    const getData = await sendPost(`uploadfile/upload/file-s3`, params)
    return getData
}

export async function uploadFileForm(params?: any) {
    const getData = await sendPost(`uploadfile/upload/file`, params)
    return getData
}

export async function deleleFile(key?: any) {
    const getData = await sendDelete(`uploadfile/delete-file/${key}`)
    return getData
}