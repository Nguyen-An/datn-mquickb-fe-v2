import { sendDelete, sendGet, sendPost, sendPut } from "./hook";

export async function signin(params?: any) {
    const postsData = await sendPost(`auth`, params)
    return postsData
}

export async function signinCustomer(params?: any) {
    const postsData = await sendPost(`auth/qr`, params)
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

export async function deleteUser(id: any) {
    const data = await sendDelete(`users/${id}`)
    return data
}