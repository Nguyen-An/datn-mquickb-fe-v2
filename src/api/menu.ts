import { sendDelete, sendGet, sendPost, sendPut } from "./hook";

export async function getDataM(params?: any) {
    const getData = await sendGet(`menu`, params)
    return getData
}

export async function getDataMenuForCustomer(params?: any) {
    const getData = await sendGet(`menu/customer`, params)
    return getData
}

export async function postDataMenu(payload?: any) {
    const data = await sendPost(`menu`, payload)
    return data
}

export async function putDataMenu(payload?: any, id?: any) {
    const data = await sendPut(`menu/${id}`, payload)
    return data
}
export async function deleteMenuItem(id: any) {
    const data = await sendDelete(`menu/${id}`)
    return data
}