"use client";
import { Input, Tooltip } from 'antd';
import Image from 'next/image';
import React from 'react';
import "@/style/page.scss"
import icon from '@/../public/icons/index';

const UserPage = () => {
    const srcIconDelete = icon['iconDelete']
    const srcIconEdit = icon['iconEdit']
    const srcIconView = icon['iconView']

    return (
        <>
            <div className='px-8 py-6'>
                <div className='text-[28px] text-blue-primary font-semibold'>Quản lý người dùng</div>
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
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Tên người dùng</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Email</th>
                                    <th className="scroll-header" style={{ width: "200px" }}>Role</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Số điện thoại</th>
                                    <th style={{ width: "170px" }}><span className="text-left">Hành động</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td className="bg-no-scroll" style={{ minWidth: '60px' }}>{(index + 1) + (currentPage - 1) * pageSize}</td> */}
                                    <td><div className="text-center">1</div></td>
                                    <td><div className="text-center">Nguyễn Văn An</div></td>
                                    <td><div className="text-center">vanan6b@gmail.com</div></td>
                                    <td><div className="text-center">Nhân viên</div></td>
                                    <td><div className="text-center">0123456789</div></td>
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
                                    <td><div className="text-center">Nguyễn Văn An</div></td>
                                    <td><div className="text-center">vanan6b@gmail.com</div></td>
                                    <td><div className="text-center">Nhân viên</div></td>
                                    <td><div className="text-center">0123456789</div></td>
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
                                    <td><div className="text-center">Nguyễn Văn An</div></td>
                                    <td><div className="text-center">vanan6b@gmail.com</div></td>
                                    <td><div className="text-center">Nhân viên</div></td>
                                    <td><div className="text-center">0123456789</div></td>
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
                                    <td><div className="text-center">Nguyễn Văn An</div></td>
                                    <td><div className="text-center">vanan6b@gmail.com</div></td>
                                    <td><div className="text-center">Nhân viên</div></td>
                                    <td><div className="text-center">0123456789</div></td>
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
                                    <td><div className="text-center">Nguyễn Văn An</div></td>
                                    <td><div className="text-center">vanan6b@gmail.com</div></td>
                                    <td><div className="text-center">Nhân viên</div></td>
                                    <td><div className="text-center">0123456789</div></td>
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
                                    <td><div className="text-center">Nguyễn Văn An</div></td>
                                    <td><div className="text-center">vanan6b@gmail.com</div></td>
                                    <td><div className="text-center">Nhân viên</div></td>
                                    <td><div className="text-center">0123456789</div></td>
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
                </div>
            </div>
        </>

    );
};

export default UserPage;
