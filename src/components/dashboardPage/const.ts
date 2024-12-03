
export function converDataOrderDashboard(data: any) {
    const dataCv = [
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0
    ]

    if (!data || !Array.isArray(data) || data?.length == 0) return dataCv

    data.forEach((item: any) => {
        if(parseInt(item.month)){
            dataCv[parseInt(item.month)-1] = item.total_orders
        }
    })

    return dataCv;
}


export function converDataRevenueDashboard(data: any) {
    const dataCv = [
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0
    ]

    if (!data || !Array.isArray(data) || data?.length == 0) return dataCv

    data.forEach((item: any) => {
        if(parseInt(item.month)){
            dataCv[parseInt(item.month)-1] = item.total_revenue
        }
    })

    return dataCv;
}