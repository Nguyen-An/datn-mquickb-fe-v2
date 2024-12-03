"use client"
import { Button, Space } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import "./listOrderPage.scss"
import { getOrderItemByCustomer } from '@/api/order';
import { getDataMenuForCustomer } from '@/api/menu';
import { convertDataOrderCustomer } from '../customerMenu/const';
import { convertMoney } from '@/constant/until';
import { COMMON, getLabelByValue } from '@/constant/common';

interface OrderCustomer {
    id: any;
    name: any;
    image_link: any;
    description: any;
    price: any;
    priceView: any;
    category: any;
    quantity: any;
    status: any;
}

const ListOrderPage = () => {
    const [menuList, setMenuList] = useState<OrderCustomer[]>([]);

    const handleDecrease = (id: any, quantity: any) => {
        if (quantity < 0) return;

        setMenuList(prevList =>
            prevList.map(menu =>
                menu.id === id && menu.quantity > 0 ? { ...menu, quantity: menu.quantity - 1 } : menu
            )
        );
    }

    const handleIncrease = (id: any) => {
        setMenuList(prevList =>
            prevList.map(menu =>
                menu.id === id ? { ...menu, quantity: menu.quantity + 1 } : menu
            )
        );
    }

    const totaldish = () => {
        return menuList.reduce((total, menu) => (total + menu.quantity), 0);
    }

    const totalMoney = () => {
        return convertMoney(menuList.reduce((total: any, item: any) => (total + item.price * item.quantity), 0));
    }

    const getDataOrderC = async () => {
        let params = {
            "page": -1,
            "page_size": 20

        }
        try {
            const dataOrder = await getOrderItemByCustomer(params)
            const dataMenu = await getDataMenuForCustomer(params)
            setMenuList(convertDataOrderCustomer(dataOrder?.data?.data, dataMenu?.data?.data))
        } catch (error) {
        }
    }

    useEffect(() => {
        getDataOrderC()
    }, [])


    return (
        <>
            <div className='bg-[#000816] text-[#fff]'>
                <div className='flex justify-center text-[18px] leading-[30px]'>Đơn hàng của bạn</div>
                <div className='h-[calc(100vh-150px)] bg-[#000816] rounded-lg shadow-lg overflow-y-auto scrollable-content'>
                    {
                        menuList.map((item, index) => (
                            <div className='flex justify-between mb-3' key={index}>
                                <div className='flex'>
                                    <div className='h-[100px] mr-1'>
                                        <Image src={item?.image_link} alt="" width={100} height={100} />
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <div>{item.name}</div>
                                        <div>{convertMoney(item.price)} đ &nbsp; x <span className='bg-[#fff] text-[#000816] rounded-[5px] p-1'>{item.quantity}</span></div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <Space>
                                        {getLabelByValue(COMMON.ORDER_STATUS,item.status)}
                                    </Space>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex cursor-pointer rounded-[12px] py-2 px-4 justify-between'> <div>Đơn hàng chưa thanh thoán - {totaldish()} món</div> <div>{totalMoney()} đ</div></div>
            </div >
        </>
    );
};

export default ListOrderPage;
