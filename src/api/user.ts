import { sendGet, sendPost, sendPut } from "./hook";

export async function signin(params?: any) {
    const postsData = await sendPost(`auth`, params)
    return postsData
}

export async function getDataU(params?: any) {
    const getData = await sendGet(`users`, params)
    return getData
}

export async function postDataUser(payload?: any) {
    const data = await sendPost(`users`, payload)
    return data
}

export async function putDataUser(payload?: any, id?: any) {
    const data = await sendPut(`users/${id}`, payload)
    return data
}
// export async function deleteMenuItem(id: any) {
//     const data = await sendDelete(`menu/${id}`)
//     return data
// }