"use client";
import { Input, Pagination, Select, Tooltip } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import "@/style/page.scss"
import icon from '@/../public/icons/index';

const OrderPage = () => {
    const srcIconDelete = icon['iconDelete']
    const srcIconEdit = icon['iconEdit']
    const srcIconView = icon['iconView']
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(100)

    // const onPageChange = async (page: number) => {
    //     // await getList(page, keyword, categorySelect);
    //     setCurrentPage(page);
    // }
    return (
        <>
            <div className='px-8 py-6'>
                <div className='text-[28px] text-blue-primary font-semibold'>Quản lý đơn hàng</div>
                <div className='app-screen'>
                    <div className='flex justify-between h-10 my-3'>
                        <div className='flex'>
                            <div className='mr-3'><Input style={{ width: 240, height: 32 }} placeholder="Basic usage" /></div>
                            <div>
                                <Select
                                    defaultValue="all"
                                    style={{ width: 240, height: 32 }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'all', label: 'Tất cả' },
                                        { value: 'pending', label: 'Chờ xử lý ' },
                                        { value: 'order_received', label: 'Đã nhận đơn' },
                                        { value: 'cooking', label: 'Đang nấu' },
                                        { value: 'served', label: 'Đã phục vụ' },
                                        { value: 'rejected', label: 'Đã từ chối' },
                                    ]}
                                /></div>
                        </div>
                        <div><button className='rounded-[8px] text-[#fff] text-[16px] bg-[#4ca2fa] px-6 py-2'>Thêm mới</button></div>
                    </div>
                    <div className='app-table-outline'>
                        <table className="app-table">
                            <thead>
                                <tr>
                                    <th><span>No.</span></th>
                                    <th className="scroll-header" style={{ minWidth: "180px" }}>Tên món ăn</th>
                                    <th className="scroll-header" style={{ minWidth: "150px" }}>Tên bàn</th>
                                    <th className="scroll-header" style={{ minWidth: "180px" }}>Tên khách hàng</th>
                                    <th className="scroll-header" style={{ width: "150px" }}>Số lượng</th>
                                    <th className="scroll-header" style={{ minWidth: "150px" }}>Đơn giá</th>
                                    <th className="scroll-header" style={{ minWidth: "150px" }}>Trạng thái</th>
                                    <th style={{ width: "170px" }}><span className="text-left">Hành động</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td className="bg-no-scroll" style={{ minWidth: '60px' }}>{(index + 1) + (currentPage - 1) * pageSize}</td> */}
                                    <td><div className="text-center">1</div></td>
                                    <td><div className="text-center">Vịt hấp ngải cứu</div></td>
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">Nguyen An</div></td>
                                    <td><div className="text-center">2</div></td>
                                    <td><div className="text-center">200000</div></td>
                                    <td><div className="text-center">Đang nấu</div></td>
                                    <td className="bg-no-scroll" style={{ width: "170px" }}>
                                        <div className="flex justify-between">
                                            <Tooltip title={"detail"}>
                                                <button><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"edit"}>
                                                <button><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"delete"}>
                                                <button><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* <td className="bg-no-scroll" style={{ minWidth: '60px' }}>{(index + 1) + (currentPage - 1) * pageSize}</td> */}
                                    <td><div className="text-center">1</div></td>
                                    <td><div className="text-center">Vịt hấp ngải cứu</div></td>
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">Nguyen An</div></td>
                                    <td><div className="text-center">2</div></td>
                                    <td><div className="text-center">200000</div></td>
                                    <td><div className="text-center">Đang nấu</div></td>
                                    <td className="bg-no-scroll" style={{ width: "170px" }}>
                                        <div className="flex justify-between">
                                            <Tooltip title={"detail"}>
                                                <button><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"edit"}>
                                                <button><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"delete"}>
                                                <button><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* <td className="bg-no-scroll" style={{ minWidth: '60px' }}>{(index + 1) + (currentPage - 1) * pageSize}</td> */}
                                    <td><div className="text-center">1</div></td>
                                    <td><div className="text-center">Vịt hấp ngải cứu</div></td>
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">Nguyen An</div></td>
                                    <td><div className="text-center">2</div></td>
                                    <td><div className="text-center">200000</div></td>
                                    <td><div className="text-center">Đang nấu</div></td>
                                    <td className="bg-no-scroll" style={{ width: "170px" }}>
                                        <div className="flex justify-between">
                                            <Tooltip title={"detail"}>
                                                <button><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"edit"}>
                                                <button><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"delete"}>
                                                <button><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* <td className="bg-no-scroll" style={{ minWidth: '60px' }}>{(index + 1) + (currentPage - 1) * pageSize}</td> */}
                                    <td><div className="text-center">1</div></td>
                                    <td><div className="text-center">Vịt hấp ngải cứu</div></td>
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">Nguyen An</div></td>
                                    <td><div className="text-center">2</div></td>
                                    <td><div className="text-center">200000</div></td>
                                    <td><div className="text-center">Đang nấu</div></td>
                                    <td className="bg-no-scroll" style={{ width: "170px" }}>
                                        <div className="flex justify-between">
                                            <Tooltip title={"detail"}>
                                                <button><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"edit"}>
                                                <button><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"delete"}>
                                                <button><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* <td className="bg-no-scroll" style={{ minWidth: '60px' }}>{(index + 1) + (currentPage - 1) * pageSize}</td> */}
                                    <td><div className="text-center">1</div></td>
                                    <td><div className="text-center">Vịt hấp ngải cứu</div></td>
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">Nguyen An</div></td>
                                    <td><div className="text-center">2</div></td>
                                    <td><div className="text-center">200000</div></td>
                                    <td><div className="text-center">Đang nấu</div></td>
                                    <td className="bg-no-scroll" style={{ width: "170px" }}>
                                        <div className="flex justify-between">
                                            <Tooltip title={"detail"}>
                                                <button><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"edit"}>
                                                <button><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"delete"}>
                                                <button><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* <td className="bg-no-scroll" style={{ minWidth: '60px' }}>{(index + 1) + (currentPage - 1) * pageSize}</td> */}
                                    <td><div className="text-center">1</div></td>
                                    <td><div className="text-center">Vịt hấp ngải cứu</div></td>
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">Nguyen An</div></td>
                                    <td><div className="text-center">2</div></td>
                                    <td><div className="text-center">200000</div></td>
                                    <td><div className="text-center">Đang nấu</div></td>
                                    <td className="bg-no-scroll" style={{ width: "170px" }}>
                                        <div className="flex justify-between">
                                            <Tooltip title={"detail"}>
                                                <button><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"edit"}>
                                                <button><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                            <Tooltip title={"delete"}>
                                                <button><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="mt-5 flex justify-center">
                        {/* <Pagination showSizeChanger={false} current={currentPage} pageSize={10} total={totalPage} onChange={onPageChange} /> */}
                    </div>
                </div>
            </div>
        </>

    );
};

export default OrderPage;
