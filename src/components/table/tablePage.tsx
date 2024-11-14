"use client";
import { Input, Pagination, QRCode, Tooltip } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import "@/style/page.scss"
import icon from '@/../public/icons/index';

const TablePage = () => {
    const srcIconDelete = icon['iconDelete']
    const srcIconEdit = icon['iconEdit']
    const srcIconView = icon['iconView']
    const [text, setText] = React.useState('https://ant.design/');
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(100)
    
    // const onPageChange = async (page: number) => {
    //     // await getList(page, keyword, categorySelect);
    //     setCurrentPage(page);
    //   }
    return (
        <>
            <div className='px-8 py-6'>
                <div className='text-[28px] text-blue-primary font-semibold'>Quản lý bàn ăn</div>
                <div className='app-screen'>
                    <div className='flex justify-between h-10 my-3'>
                        <div><Input placeholder="Basic usage" /></div>
                        <div><button className='rounded-[8px] text-[#fff] text-[16px] bg-[#4ca2fa] px-6 py-2'>Thêm mới</button></div>
                    </div>
                    <div className='app-table-outline'>
                        <table className="app-table">
                            <thead>
                                <tr>
                                    <th><span>No.</span></th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Tên bàn ăn</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Link QR code</th>
                                    <th className="scroll-header" style={{ width: "120px" }}>Mã QR code</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Trạng thái</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Cập nhật lúc</th>
                                    <th style={{ width: "170px" }}><span className="text-left">Hành động</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td className="bg-no-scroll" style={{ minWidth: '60px' }}>{(index + 1) + (currentPage - 1) * pageSize}</td> */}
                                    <td><div className="text-center">1</div></td>
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">{ text }</div></td>
                                    <td><div className="text-center"> <QRCode size={120} value={text || '-'} /></div></td>
                                    <td><div className="text-center">Trống</div></td>
                                    <td><div className="text-center">22/1/2024</div></td>
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
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">{ text }</div></td>
                                    <td><div className="text-center"> <QRCode size={120} value={text || '-'} /></div></td>
                                    <td><div className="text-center">Trống</div></td>
                                    <td><div className="text-center">22/1/2024</div></td>
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
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">{ text }</div></td>
                                    <td><div className="text-center"> <QRCode size={120} value={text || '-'} /></div></td>
                                    <td><div className="text-center">Trống</div></td>
                                    <td><div className="text-center">22/1/2024</div></td>
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
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">{ text }</div></td>
                                    <td><div className="text-center"> <QRCode size={120} value={text || '-'} /></div></td>
                                    <td><div className="text-center">Trống</div></td>
                                    <td><div className="text-center">22/1/2024</div></td>
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
                                    <td><div className="text-center">Bàn số 1</div></td>
                                    <td><div className="text-center">{ text }</div></td>
                                    <td><div className="text-center"> <QRCode size={120} value={text || '-'} /></div></td>
                                    <td><div className="text-center">Trống</div></td>
                                    <td><div className="text-center">22/1/2024</div></td>
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

export default TablePage;
