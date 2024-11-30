"use client"
import { Button, Space } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import "./listMenuPage.scss"

const menus = [
    { id: "1", name: "Bánh chưng", price: 100000, quantity: 0, status: "Chờ xử lý" },
    { id: "2", name: "Bánh bao", price: 100000, quantity: 1, status: "Chờ xử lý" },
    { id: "3", name: "Bánh kem", price: 100000, quantity: 2, status: "Chờ xử lý" },
    { id: "4", name: "Bánh đa", price: 100000, quantity: 3, status: "Chờ xử lý" },
    { id: "5", name: "Bánh sinh nhật", price: 100000, quantity: 4, status: "Chờ xử lý" },
    { id: "6", name: "Bánh xe", price: 100000, quantity: 4, status: "Chờ xử lý" },
    { id: "7", name: "Bánh giò", price: 100000, quantity: 4, status: "Chờ xử lý" },
    { id: "8", name: "Bánh tét", price: 100000, quantity: 4, status: "Chờ xử lý" },
]

const ListOrderPage = () => {
    const [menuList, setMenuList] = useState(menus);

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
        return menuList.reduce((total: any, item: any) => (total + item.price * item.quantity), 0);
    }

    return (
        <>
            <div className='bg-[#000816] text-[#fff]'>
                <div className='flex justify-center text-[18px] leading-[30px]'>Đơn hàng của bạn</div>
                <div className='h-[calc(100vh-150px)] bg-[#000816] rounded-lg shadow-lg overflow-y-auto scrollable-content'>
                    {
                        menuList.map((item, index) => (
                            <div className='flex justify-between mb-3 pr-2' key={index}>
                                <div className='flex'>
                                    <div>{index + 1} &nbsp;&nbsp;</div>
                                    <div className='h-[100px] mr-1'>
                                        <Image src="https://mquickb.s3.amazonaws.com/5f4dcc77-8e81-4657-be0f-e03b47d63760.jpg" alt="" width={100} height={100} />
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <div>{item.name}</div>
                                        <div>{item.price}đ &nbsp; x <span className='bg-[#fff] text-[#000816] rounded-[5px] p-1'>{item.quantity}</span></div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <Space>
                                      {item.status}
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
