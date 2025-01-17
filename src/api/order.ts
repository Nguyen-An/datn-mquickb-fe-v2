import { sendDelete, sendGet, sendPost, sendPut } from "./hook";

export async function getDataOrderItems(params?: any) {
    const getData = await sendGet(`order/order-items`, params)
    return getData
}

export async function postDataOrderItems(payload?: any) {
    const data = await sendPost(`order/order-items`, payload)
    return data
}

export async function postDataOrderItemsByCustomer(payload?: any) {
    const data = await sendPost(`order/customer`, payload)
    return data
}

export async function getOrderItemByCustomer(params?: any) {
    const getData = await sendGet(`order/customer`, params)
    return getData
}

export async function updateStatusOrderItem(id: any, params?: any) {
    const getData = await sendPut(`order/order-items/${id}`, params)
    return getData
}

export async function payTable(id: any, params?: any) {
    const getData = await sendPut(`order/pay/${id}`, params)
    return getData
}

export async function getDataDashboardOrder(params?: any) {
    const getData = await sendGet(`order/dashboard/order`, params)
    return getData
}


export async function getDataDashboardRevenue(params?: any) {
    const getData = await sendGet(`order/dashboard/revenue`, params)
    return getData
}

export async function getStaffCallByOrderId(orderId:any, params?: any) {
    const getData = await sendGet(`order/staff-call/${orderId}`, params)
    return getData
}

export async function postStaffCall(payload?: any) {
    const data = await sendPost(`order/staff-call`, payload)
    return data
}

export async function getBillByOrder(id?: any) {
    const data = await sendGet(`order/bill-order/${id}`)
    return data
}