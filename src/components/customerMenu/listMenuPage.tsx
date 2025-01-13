"use client"
import { Button, notification, Space } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import "./listMenuPage.scss"
import { getDataMenuForCustomer } from '@/api/menu';
import { convertDataMenuCustomer } from './const';
import { convertMoney } from '@/constant/until';
import { postDataOrderItemsByCustomer } from '@/api/order';
import { useRouter } from 'next/navigation';
import MenuCustomerDetailModal from './menuCustomerDetailModal';
import { DataFrom } from '@/lib/interface';

interface MenuCustomer {
    id: any;
    name: any;
    image_link: any;
    description: any;
    price: any;
    priceView: any;
    category: any;
    quantity: any;
}

const ListMenuPage = () => {
    const [menuList, setMenuList] = useState<MenuCustomer[]>([]);
    const router = useRouter();
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [dataFrom, setDataFrom] = useState<DataFrom>({
        mode: "detail",
        data: {}
    })

    const handleCancelModalDetail = () => {
        setIsShowDetail(false)
    }

    const handleOkModalDetail = () => {
        setIsShowDetail(false)
    }

        const handleShowModal = (mode: string, item: any) => {
            setIsShowDetail(true)
            const data: DataFrom = {
                mode: mode,
                data: item
            }
            setDataFrom(data)
        }

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

    const getDataMenu = async () => {
        let params = {
            "page": -1,
            "page_size": 20

        }
        try {
            const data = await getDataMenuForCustomer(params)
            setMenuList(convertDataMenuCustomer(data?.data?.data))
        } catch (error) {
        }
    }

    useEffect(() => {
        getDataMenu()
    }, [])

    const handleOrder = async () => {
        try {
            const payload = {
                items: menuList.filter(item => item.quantity !== 0).map(item => {
                    return {
                        menu_item_id: item.id,
                        quantity: item.quantity,
                        status: "pending",
                        price: item.price,
                    }
                })
            }

            await postDataOrderItemsByCustomer(payload)
            notification["success"]({
                message: `Đặt món thành công!`,
            });

            router.push("/customer/list-order");
            
        } catch (error) {
            notification["error"]({
                message: `Đặt món thất bại, vui lòng liên hệ nhân viên!`,
            });
        }
    }

    return (
        <>
            <div className='bg-[#000816] text-[#fff]'>
                <div className='flex justify-center text-[18px] leading-[30px]'>Menu Quán</div>
                <div className='h-[calc(100vh-150px)] bg-[#000816] rounded-lg shadow-lg overflow-y-auto scrollable-content'>
                    {
                        menuList.map((item, index) => (
                            <div className='flex justify-between mb-3 pr-2' key={index}>
                                <div className='flex'>
                                    <div>{index + 1} &nbsp;&nbsp;</div>
                                    <div className='h-[100px] mr-1 cursor-pointer' onClick={() => { handleShowModal("view", item) }}>
                                        <Image src={item.image_link} alt="" width={100} height={100} />
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <div>{item.name}</div>
                                        <div>{item.priceView} đ</div>
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
                <div className='flex bg-[#fff] cursor-pointer text-[#000816] rounded-[12px] py-2 px-4 justify-between hover:opacity-80' onClick={() => { handleOrder() }}> <div>Đặt hàng - {totaldish()} món</div> <div>{totalMoney()} đ</div></div>
            </div >
            {isShowDetail ? (<MenuCustomerDetailModal isModalOpen={isShowDetail} dataFrom={dataFrom} handleCancel={handleCancelModalDetail} handleOk={handleOkModalDetail}></MenuCustomerDetailModal>) : null}
        </>
    );
};

export default ListMenuPage;
