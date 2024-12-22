import { sendGet, sendPost } from "./hook";

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