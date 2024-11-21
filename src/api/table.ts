import { sendDelete, sendGet, sendPost, sendPut } from "./hook";

export async function getDataTable(params?: any) {
    const getData = await sendGet(`tables`, params)
    return getData
}

export async function postDataTable(payload?: any) {
    const data = await sendPost(`tables`, payload)
    return data
}

export async function putDataTable(payload?: any, id?: any) {
    const data = await sendPut(`tables/${id}`, payload)
    return data
}
export async function deleteTable(id: any) {
    const data = await sendDelete(`tables/${id}`)
    return data
}