import { sendPost } from "./hook";

export async function signin(params?: any) {
    const postsData = await sendPost(`auth`, params)
    return postsData
}
