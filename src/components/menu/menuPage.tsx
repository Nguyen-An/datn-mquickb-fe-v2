"use client";
import { Input, Modal, Pagination, Tooltip } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "@/style/page.scss"
import icon from '@/../public/icons/index';
import MenuDetailModal from './menuDetailModal';
import MenuFormModal from './menuFormModal';
import { DataFrom } from '@/lib/interface';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getData } from '@/api/menu';

const { confirm } = Modal;

interface Menu {
    category: any;
    created_at: any;
    description: any;
    id: any;
    image_link: any;
    is_available: any;
    name: any;
    price: any;
    updated_at: any;
}

const MenuPage = () => {
    const srcIconDelete = icon['iconDelete']
    const srcIconEdit = icon['iconEdit']
    const srcIconView = icon['iconView']

    const [isShowDetail, setIsShowDetail] = useState(false)
    const [isShowForm, setIsShowForm] = useState(false)
    const [dataFrom, setDataFrom] = useState<DataFrom>({
        mode: "detail",
        data: {}
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [dataTable, setDataTable] = useState<Menu[]>([])

    const onPageChange = async (page: number) => {
        // await getList(page, keyword, categorySelect);
        setCurrentPage(page);
    }

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

    const handleCancelModalDetail = () => {
        setIsShowDetail(false)
    }

    const handleOkModalDetail = () => {
        setIsShowDetail(false)
    }
    const handleCancelForm = () => {
        setIsShowForm(false)
    }

    const showDeleteConfirm = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa món ăn này',
            icon: <ExclamationCircleFilled />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            centered: true,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const getDataMenu = async (page: number) => {
        let params = {
            "page": page,
            "page_size": 20
        }
        try {
            const data = await getData(params)
            setDataTable(data?.data?.data)
            setCurrentPage(data?.data?.currentPage)
        } catch (error) {
            // notification.open({
            //     message: 'Tài khoản hoặc mật khẩu không chính xác, vui lòng đăng nhập lại!',
            //     type: 'error'
            // });
        }
    }

    useEffect(() => {
        const getDT = async () => {
            let params = {
                "page": 1,
                "page_size": 20
            }

            try {
                const data = await getData(params)
                setDataTable(data?.data?.data)
                setCurrentPage(data?.data?.current_page)
            } catch (error) {
            }
        }
        getDT()
    }, [])

    return (
        <>
            <div className='px-8 py-6'>
                <div className='text-[28px] text-blue-primary font-semibold'>Quản lý món ăn</div>
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
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Tên món ăn</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Miêu tả</th>
                                    <th className="scroll-header" style={{ width: "120px" }}>Ảnh</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Loại món</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Trạng thái</th>
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
                                                <td><div className="text-center">{item?.description}</div></td>
                                                <td><div className="text-center"><Image src={item?.image_link} alt="" width={120} height={120} /></div></td>
                                                <td><div className="text-center">{item?.category}</div></td>
                                                <td><div className="text-center">{item?.is_available ? "Hoạt động" : "Không hoạt động"}</div></td>
                                                <td className="bg-no-scroll" style={{ width: "170px" }}>
                                                    <div className="flex justify-between">
                                                        <Tooltip title={"detail"}>
                                                            <button onClick={() => { handleShowModal("view", item) }}><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                                        </Tooltip>
                                                        <Tooltip title={"edit"}>
                                                            <button onClick={() => { handleShowModal("edit", item) }}><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
                                                        </Tooltip>
                                                        <Tooltip title={"delete"}>
                                                            <button onClick={() => { showDeleteConfirm() }}><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
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
                    {isShowDetail ? (<MenuDetailModal isModalOpen={isShowDetail} dataFrom={dataFrom} handleCancel={handleCancelModalDetail} handleOk={handleOkModalDetail}></MenuDetailModal>) : null}
                    {isShowForm ? (<MenuFormModal isModalOpen={isShowForm} dataFrom={dataFrom} handleCancel={handleCancelForm}></MenuFormModal>) : null}
                </div>
            </div>
        </>

    );
};

export default MenuPage;
