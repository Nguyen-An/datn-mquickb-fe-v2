"use client"
import { Button, Space } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import "./listMenuPage.scss"

const menus = [
    { id: "1", name: "Bánh chưng", price: 100000, quantity: 0 },
    { id: "2", name: "Bánh bao", price: 100000, quantity: 1 },
    { id: "3", name: "Bánh kem", price: 100000, quantity: 2 },
    { id: "4", name: "Bánh đa", price: 100000, quantity: 3 },
    { id: "5", name: "Bánh sinh nhật", price: 100000, quantity: 4 },
    { id: "6", name: "Bánh xe", price: 100000, quantity: 4 },
    { id: "7", name: "Bánh giò", price: 100000, quantity: 4 },
    { id: "8", name: "Bánh tét", price: 100000, quantity: 4 },
]

const ListMenuPage = () => {
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
                <div className='flex justify-center text-[18px] leading-[30px]'>Menu Quán</div>
                <div className='h-[calc(100vh-150px)] bg-[#000816] rounded-lg shadow-lg overflow-y-auto scrollable-content'>
                    {
                        menuList.map((item, index) => (
                            <div className='flex justify-between mb-3' key={index}>
                                <div className='flex'>
                                    <div className='h-[100px] mr-1'>
                                        <Image src="https://mquickb.s3.amazonaws.com/5f4dcc77-8e81-4657-be0f-e03b47d63760.jpg" alt="" width={100} height={100} />
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <div>{item.name}</div>
                                        <div>{item.price}</div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <Space>
                                        <Button onClick={() => handleDecrease(item.id, item.quantity)}>-</Button>
                                        <span>{item.quantity}</span>
                                        <Button onClick={() => handleIncrease(item.id)}>+</Button>
                                    </Space>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex bg-[#fff] cursor-pointer text-[#000816] rounded-[12px] py-2 px-4 justify-between hover:opacity-80'> <div>Đặt hàng - {totaldish()} món</div> <div>{totalMoney()} đ</div></div>
            </div >
        </>
    );
};

export default ListMenuPage;
