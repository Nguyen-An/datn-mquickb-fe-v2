import { sendDelete, sendGet, sendPost, sendPut } from "./hook";

export async function getDataOrderItems(params?: any) {
    const getData = await sendGet(`order/order-items`, params)
    return getData
}

export async function postDataOrderItems(payload?: any) {
    const data = await sendPost(`order/order-items`, payload)
    return data
}

// export async function putDataMenu(payload?: any, id?: any) {
//     const data = await sendPut(`menu/${id}`, payload)
//     return data
// }
// export async function deleteMenuItem(id: any) {
//     const data = await sendDelete(`menu/${id}`)
//     return data
// }