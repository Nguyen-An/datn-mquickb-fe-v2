"use client";
import { Input, notification, Pagination, Tooltip } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "@/style/page.scss"
import icon from '@/../public/icons/index';
import { deleteUser, getDataU } from '@/api/user';
import { DataFrom } from '@/lib/interface';
import confirm from 'antd/es/modal/confirm';
import { ExclamationCircleFilled } from '@ant-design/icons';
import UserDetailModal from './userDetailModal';
import UserFormModal from './userFormModal';

interface User {
    name: any;
    email: any;
    id: any;
    role: any;
    created_at: any;
    password_hash: any;
    phone_number: any;
    updated_at: any;
}

const UserPage = () => {
    const srcIconDelete = icon['iconDelete']
    const srcIconEdit = icon['iconEdit']
    const srcIconView = icon['iconView']

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [dataTable, setDataTable] = useState<User[]>([])

    const [isShowDetail, setIsShowDetail] = useState(false)
    const [isShowForm, setIsShowForm] = useState(false)
    const [dataFrom, setDataFrom] = useState<DataFrom>({
        mode: "detail",
        data: {}
    })

    const handleShowModal = (mode: string, item: any) => {
        switch (mode) {
            case 'view':
                setIsShowDetail(true)
                break;
            case 'create':
                setIsShowForm(true)
                break;
            case 'edit':
                setIsShowForm(true)
                break;
            default:
                break;
        }

        const data: DataFrom = {
            mode: mode,
            data: item
        }

        setDataFrom(data)
    }

    const getDataUser = async (page: number) => {
        let params = {
            "page": page,
            "page_size": 20
        }
        try {
            const data = await getDataU(params)
            setDataTable(data?.data?.data)
            setCurrentPage(data?.data?.current_page)
        } catch (error) {
        }
    }


    const showDeleteConfirm = (item: any) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa bàn ăn này',
            icon: <ExclamationCircleFilled />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            centered: true,
            onOk: async () => {
                try {
                    await deleteUser(item.id)
                    notification.open({
                        message: 'Xóa user thành công!',
                        type:'success'
                    });
                    getDataUser(currentPage)
                } catch (error) {
                    notification.open({
                        message: 'Đã có lỗi xảy ra',
                        type: 'error'
                    });
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleCancelModalDetail = () => {
        setIsShowDetail(false)
    }

    const handleOkModalDetail = () => {
        setIsShowDetail(false)
    }
    const handleCancelForm = (reload?: boolean) => {
        if(reload) getDataUser(currentPage)
        setIsShowForm(false)
    }

    const onPageChange = async (page: number) => {
        // await getList(page, keyword, categorySelect);
        setCurrentPage(page);
    }

    useEffect(() => {
        getDataUser(1)
    }, [])
    return (
        <>
            <div className='px-8 py-6'>
                <div className='text-[28px] text-blue-primary font-semibold'>Quản lý người dùng</div>
                <div className='app-screen'>
                    <div className='flex justify-between h-10 my-3'>
                        <div><Input placeholder="Basic usage" /></div>
                        <div><button className='rounded-[8px] text-[#fff] text-[16px] bg-[#4ca2fa] px-6 py-2' onClick={() => { handleShowModal("create", null) }}>Thêm mới</button></div>
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
                                {(dataTable && dataTable?.length > 0) ? (<>
                                    {
                                        dataTable.map((item: any, index: any) => (
                                            <tr key={index}>
                                                <td><div className="text-center">{(index + 1) + (currentPage - 1) * 20}</div></td>
                                                <td><div className="text-center">{item?.name}</div></td>
                                                <td><div className="text-center">{item?.email}</div></td>
                                                <td><div className="text-center">{item?.role}</div></td>
                                                <td><div className="text-center">{item?.phone_number}</div></td>
                                                <td className="bg-no-scroll" style={{ width: "170px" }}>
                                                    <div className="flex justify-between">
                                                        <Tooltip title={"detail"}>
                                                            <button onClick={() => { handleShowModal("view", item) }}><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                                        </Tooltip>
                                                        <Tooltip title={"edit"}>
                                                            <button onClick={() => { handleShowModal("edit", item) }}><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
                                                        </Tooltip>
                                                        <Tooltip title={"delete"}>
                                                            <button onClick={() => { showDeleteConfirm(item) }}><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </>) : null}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <Pagination showSizeChanger={false} current={currentPage} pageSize={10} total={totalPage} onChange={onPageChange} />
                    </div>
                    {isShowDetail ? (<UserDetailModal isModalOpen={isShowDetail} dataFrom={dataFrom} handleCancel={handleCancelModalDetail} handleOk={handleOkModalDetail}></UserDetailModal>) : null}
                    {isShowForm ? (<UserFormModal isModalOpen={isShowForm} dataFrom={dataFrom} handleCancel={handleCancelForm}></UserFormModal>) : null}
                </div>
            </div>
        </>

    );
};

export default UserPage;
