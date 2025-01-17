"use client";
import { Input, notification, Pagination, QRCode, Tooltip } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "@/style/page.scss"
import icon from '@/../public/icons/index';
import { DataFrom } from '@/lib/interface';
import { deleteTable, getDataTable } from '@/api/table';
import { ExclamationCircleFilled } from '@ant-design/icons';
import confirm from 'antd/es/modal/confirm';
import TableDetailModal from './tableDetailModal';
import TableFormModal from './tableFormModal';
import moment from 'moment';
import { COMMON, getLabelByValue } from '@/constant/common';
import { getLinkQRCode } from '@/constant';
import StaffCallModal from './staffCallModal';
import { jwtDecode } from 'jwt-decode';
interface Table {
    id: any;
    qr_code: any;
    table_name: any;
    status: any;
    created_at: any;
    updated_at: any;
}

const TablePage = () => {
    const srcIconDelete = icon['iconDelete']
    const srcIconEdit = icon['iconEdit']
    const srcIconView = icon['iconView']
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [isShowStaffCall, setIsShowStaffCall] = useState(false)
    const [isShowForm, setIsShowForm] = useState(false)
    const [dataInfotable, setDataInfotable] = useState(null)
    const [userInfo, setUserInfo] = useState<any>();

    const [dataFrom, setDataFrom] = useState<DataFrom>({
        mode: "detail",
        data: {}
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [dataTable, setDataTable] = useState<Table[]>([])

    const onPageChange = async (page: number) => {
        // await getList(page, keyword, categorySelect);
        setCurrentPage(page);
    }

    const handleCancelModalDetail = (reload?: boolean) => {
        if (reload) getData(currentPage)
        setIsShowDetail(false)
    }

    const handleOkModalDetail = () => {
        setIsShowDetail(false)
    }

    const handleCancelModalStaffCall = (reload?: boolean) => {
        if (reload) getData(currentPage)
        setIsShowStaffCall(false)
    }

    const handleOkModalStaffCall = () => {
        setIsShowStaffCall(false)
    }

    const getData = async (page: number) => {
        let params = {
            "page": page,
            "page_size": 10
        }
        try {
            const data = await getDataTable(params)
            setDataTable(data?.data?.data)
            setCurrentPage(data?.data?.current_page)
            setTotalPage(data?.data?.total_pages)
        } catch (error) {
        }
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

    const showModalStaffCall = (item: any) => {
        setDataInfotable(item)
        setIsShowStaffCall(true)
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
            maskClosable: true,
            onOk: async () => {
                try {
                    await deleteTable(item.id)
                    notification.open({
                        message: 'Xóa bàn ăn thành công!',
                        type: 'success'
                    });
                    getData(currentPage)
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

    const handleCancelForm = (reload?: boolean) => {
        if (reload) getData(currentPage)
        setIsShowForm(false)
    }

    useEffect(() => {
        const token = localStorage?.getItem("token");
        const user = (token ? jwtDecode(token) : null) as any;
        setUserInfo(user);
    }, []);

    useEffect(() => {
        getData(1)
    }, [])

    useEffect(() => {
        getData(currentPage)
    }, [currentPage])

    return (
        <>
            <div className='px-8 py-6'>
                <div className='text-[28px] text-blue-primary font-semibold'>Quản lý bàn ăn</div>
                <div className='app-screen'>
                    <div className='flex justify-between h-10 my-3'>
                        <div></div>
                        {userInfo?.role_id == "manager" && (
                            <div>
                                <button className='rounded-[8px] text-[#fff] text-[16px] bg-[#4ca2fa] px-6 py-2' onClick={() => { handleShowModal("create", null) }}>
                                    Thêm mới
                                </button>
                            </div>
                        )}
                    </div>
                    <div className='app-table-outline'>
                        <table className="app-table">
                            <thead>
                                <tr>
                                    <th><span>No.</span></th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Tên bàn ăn</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Link QR code</th>
                                    <th className="scroll-header" style={{ width: "120px" }}>Mã QR code</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Trạng thái bàn ăn</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Trạng thái khách hàng</th>
                                    <th style={{ width: userInfo?.role_id == "manager" ? "170px" : "110px" }}><span className="text-left">Hành động</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(dataTable && dataTable?.length > 0) ? (<>
                                    {
                                        dataTable.map((item: any, index: any) => (
                                            <tr key={index}>
                                                <td><div className="text-center">{(index + 1) + (currentPage - 1) * 10}</div></td>
                                                <td><div className="text-center">{item?.table_name}</div></td>
                                                <td><div className="text-center">{getLinkQRCode(item?.qr_code)}</div></td>
                                                <td><div className="text-center"><QRCode size={120} value={getLinkQRCode(item?.qr_code) || '-'} /></div></td>
                                                <td><div className="text-center">{getLabelByValue(COMMON.TABLE_STATUS, item?.status)}</div></td>
                                                <td>
                                                    {
                                                        (item?.order_id && item?.status == 'in_use') ?
                                                            <div className="text-center">
                                                                <button className='rounded-[8px] text-[#fff] text-[16px] bg-[#c48034] px-6 py-2' onClick={() => showModalStaffCall(item)}>Xem yêu cầu</button>
                                                            </div>
                                                            : <></>
                                                    }
                                                </td>
                                                <td className="bg-no-scroll" style={{ width: userInfo?.role_id == "manager" ? "170px" : "110px" }}>
                                                    <div className="flex justify-between">
                                                        <Tooltip title={"Xem chi tiết"}>
                                                            <button onClick={() => { handleShowModal("view", item) }}><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                                        </Tooltip>
                                                        <Tooltip title={"Chỉnh sửa"}>
                                                            <button onClick={() => { handleShowModal("edit", item) }}><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
                                                        </Tooltip>
                                                        {userInfo?.role_id == "manager" && (
                                                            <Tooltip title={"Xóa"}>
                                                                <button onClick={() => { showDeleteConfirm(item) }}><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
                                                            </Tooltip>
                                                        )}
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
                        <Pagination showSizeChanger={false} current={currentPage} pageSize={1} total={totalPage} onChange={onPageChange} />
                    </div>
                    {isShowDetail ? (<TableDetailModal isModalOpen={isShowDetail} dataFrom={dataFrom} handleCancel={handleCancelModalDetail} handleOk={handleOkModalDetail}></TableDetailModal>) : null}
                    {isShowStaffCall ? (<StaffCallModal isModalOpen={isShowStaffCall} dataFrom={dataInfotable} handleCancel={handleCancelModalStaffCall} handleOk={handleOkModalStaffCall}></StaffCallModal>) : null}
                    {isShowForm ? (<TableFormModal isModalOpen={isShowForm} dataFrom={dataFrom} handleCancel={handleCancelForm}></TableFormModal>) : null}
                </div>
            </div>
        </>

    );
};

export default TablePage;
