import { convertMoney } from "@/constant/until";

export function convertDataOrder(data: any){
    if(!data || !Array.isArray(data) || data?.length == 0 ) return []

    const dataConvert = data.map((item: any) => {
        return {
            id: item.id,
            order_id: item.order_id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            status: item.status,
            name_table: item.name_table,
            created_by: item.created_by,
            updated_by: item.updated_by,
            created_at: item.created_at,
            updated_at: item.updated_at,
            menu_item_name: item.menu_item_name,
        }   
    })
    
    return dataConvert;
}