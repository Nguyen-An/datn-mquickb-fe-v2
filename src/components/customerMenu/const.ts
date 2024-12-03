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