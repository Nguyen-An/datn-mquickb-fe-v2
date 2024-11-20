import { sendDelete, sendGet, sendPost } from "./hook";

export async function getData(params?: any) {
    const getData = await sendGet(`menu`, params)
    return getData
}

export async function postDataMenu(payload?: any) {
    const data = await sendPost(`menu`, payload)
    return data
}

export async function deleteMenuItem(id: any) {
    const data = await sendDelete(`menu/${id}`)
    return data
}