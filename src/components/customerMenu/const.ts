import { convertMoney } from "@/constant/until";

export function convertDataMenuCustomer(data: any){
    if(!data || !Array.isArray(data) || data?.length == 0 ) return []

    const dataConvert = data.map((item: any) => {
        return {
            id: item.id,
            name: item.name,
            image_link: item.image_link,
            description: item.description,
            price: item.price,
            priceView: convertMoney(item.price),
            category: item.category,
            quantity: 0,
        }   
    })
    
    return dataConvert;
}

export function convertDataOrderCustomer(dataOrder: any, dataMenu: any){
    if(!dataOrder || !Array.isArray(dataOrder) || dataOrder?.length == 0 ) return []
    if(!dataMenu || !Array.isArray(dataMenu) || dataMenu?.length == 0 ) return []

    const dataOrderCount = dataOrder.map((item: any) => {
        const itemMenu = dataMenu.find(itemM => itemM?.id === item?.menu_item_id) 

        return {
            id: item.id,
            name: itemMenu.name,
            image_link: itemMenu.image_link,
            description: itemMenu.description,
            price: itemMenu.price,
            priceView: convertMoney(itemMenu.price),
            category: itemMenu.category,
            quantity: item.quantity,
            status: item.status,
        }   
    })
    
    return dataOrderCount;
}

