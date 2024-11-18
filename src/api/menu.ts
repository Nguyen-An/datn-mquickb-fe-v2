import { sendGet, sendPost } from "./hook";

export async function getData(params?: any) {
    const getData = await sendGet(`menu`, params)
    return getData
}
