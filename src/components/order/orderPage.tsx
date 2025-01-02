"use client";
import { Button, Input, Pagination, Select, Tooltip } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "@/style/page.scss"
import icon from '@/../public/icons/index';
import { DataFrom } from '@/lib/interface';
import { getDataOrderItems } from '@/api/order';
import OrderItemDetailModal from './orderItemDetailModal';
import OrderItemFormModal from './orderItemFormModal';
import confirm from 'antd/es/modal/confirm';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { convertDataOrder } from './const';
import { convertTimeToFormat } from '@/constant/until';
import { COMMON, getLabelByValue } from '@/constant/common';

interface OrderItems {
    id: any;
    order_id: any;
    menu_item_id: any;
    quantity: any;
    status: any;
    name_table: any;
    created_by: any;
    updated_by: any;
    created_at: any;
    updated_at: any;
    menu_item_name: any;
}

const OrderPage = () => {
    const srcIconDelete = icon['iconDelete']
    const srcIconEdit = icon['iconEdit']
    const srcIconView = icon['iconView']

    const [isShowDetail, setIsShowDetail] = useState(false)
    const [isShowForm, setIsShowForm] = useState(false)
    const [dataFrom, setDataFrom] = useState<DataFrom>({
        mode: "detail",
        data: {}
    })

    const [status, setStatus] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [dataTable, setDataTable] = useState<OrderItems[]>([])

    const onPageChange = async (page: number) => {
        setCurrentPage(page);
    }

    const handleChange = (value: string) => {
        setStatus(value)
        setCurrentPage(1);
    };

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
    const handleCancelForm = (reload?: boolean) => {
        if (reload) getDataOrderItem(currentPage)
        setIsShowForm(false)
    }

    const getDataOrderItem = async (page: number) => {
        let params = {
            "page": page,
            "page_size": 10,
            "status": status
        }
        try {
            const data = await getDataOrderItems(params)
            setDataTable(convertDataOrder(data?.data?.data))
            setCurrentPage(data?.data?.current_page)
            setTotalPage(data?.data?.total_pages)
        } catch (error) {
        }
    }

    useEffect(() => {
        getDataOrderItem(1)
    }, [])

    useEffect(() => {
        getDataOrderItem(currentPage)
    }, [status, currentPage])

    return (
        <>
            <div className='px-8 py-6'>
                <div className='text-[28px] text-blue-primary font-semibold'>Quản lý đơn hàng</div>
                <div className='app-screen'>
                    <div className='flex justify-between h-10 my-3'>
                        <div className='flex'>
                            <div className='flex'>
                            </div>
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
                                        { value: 'paid', label: 'Đã thanh toán' },
                                    ]}
                                /></div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='app-table-outline'>
                        <table className="app-table">
                            <thead>
                                <tr>
                                    <th><span>No.</span></th>
                                    <th className="scroll-header" style={{ minWidth: "180px" }}>Tên bàn</th>
                                    <th className="scroll-header" style={{ minWidth: "150px" }}>Tên món ăn</th>
                                    <th className="scroll-header" style={{ width: "150px" }}>Số lượng</th>
                                    <th className="scroll-header" style={{ minWidth: "150px" }}>Trạng thái</th>
                                    <th className="scroll-header" style={{ minWidth: "150px" }}>Lần cập nhật gần nhất</th>
                                    <th style={{ width: "110px" }}><span className="text-left">Hành động</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(dataTable && dataTable?.length > 0) ? (<>
                                    {
                                        dataTable.map((item, index: any) => (
                                            <tr key={index}>
                                                <td><div className="text-center">{(index + 1) + (currentPage - 1) * 10}</div></td>
                                                <td><div className="text-center">{item?.name_table ?? "--"}</div></td>
                                                <td><div className="text-center">{item?.menu_item_name}</div></td>
                                                <td><div className="text-center">{item?.quantity}</div></td>
                                                <td><div className="text-center">{getLabelByValue(COMMON.ORDER_STATUS, item?.status)}</div></td>
                                                <td><div className="text-center">{convertTimeToFormat(item?.updated_at)}</div></td>
                                                <td className="bg-no-scroll" style={{ width: "110px" }}>
                                                    <div className="flex justify-between">
                                                        <Tooltip title={"detail"}>
                                                            <button onClick={() => { handleShowModal("view", item) }}><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                                        </Tooltip>
                                                        <Tooltip title={"edit"}>
                                                            <button onClick={() => { handleShowModal("edit", item) }}><Image src={srcIconEdit} alt="" className='mt-5' width={40} height={40} /></button>
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
                        <Pagination showSizeChanger={false} current={currentPage} pageSize={1} total={totalPage} onChange={onPageChange} />
                    </div>
                    {isShowDetail ? (<OrderItemDetailModal isModalOpen={isShowDetail} dataFrom={dataFrom} handleCancel={handleCancelModalDetail} handleOk={handleOkModalDetail}></OrderItemDetailModal>) : null}
                    {isShowForm ? (<OrderItemFormModal isModalOpen={isShowForm} dataFrom={dataFrom} handleCancel={handleCancelForm}></OrderItemFormModal>) : null}
                </div>
            </div>
        </>

    );
};

export default OrderPage;
