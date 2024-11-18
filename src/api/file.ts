import { sendGet, sendPost } from "./hook";

export async function uploadIamge(params?: any) {
    const getData = await sendPost(`uploadfile/upload/avatar`, params)
    return getData
}
