"use client";
import { Input, Pagination, Tooltip } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "@/style/page.scss"
import icon from '@/../public/icons/index';
import { getDataFiles } from '@/api/file';
import { convertTimeToFormat, convertTimeToFormat2 } from '@/constant/until';
import FileFormModal from './fileFormModal';
import { DataFrom } from '@/lib/interface';

interface FileChat {
    id: any;
    aifile_id: any;
    describe: any;
    file_name: any;
    file_path: any;
    file_path_s3: any;
    key: any;
    uploaded_at: any;
}

const FilePage = () => {
    const srcIconDelete = icon['iconDelete']
    const srcIconEdit = icon['iconEdit']
    const srcIconView = icon['iconView']
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [dataTable, setDataTable] = useState<FileChat[]>([])
    const [isShowForm, setIsShowForm] = useState(false)
    const [dataFrom, setDataFrom] = useState<DataFrom>({
        mode: "detail",
        data: {}
    })

    const onPageChange = async (page: number) => {
        // await getList(page, keyword, categorySelect);
        setCurrentPage(page);
    }

    const getData = async (page: number) => {
        let params = {
            "page": page,
            "page_size": 10
        }
        try {
            const data = await getDataFiles(params)
            setDataTable(data?.data?.data)
            setCurrentPage(data?.data?.current_page)
        } catch (error) {
        }
    }

    const handleShowModal = (mode: string, item: any) => {
        setIsShowForm(true)

        const data: DataFrom = {
            mode: mode,
            data: item
        }

        setDataFrom(data)
    }

    const handleCancelForm = (reload?: boolean) => {
        if (reload) getData(currentPage)
        setIsShowForm(false)
    }

    useEffect(() => {
        getData(1)
    }, [])

    return (
        <>
            <div className='px-8 py-6'>
                <div className='text-[28px] text-blue-primary font-semibold'>Quản lý tài liệu</div>
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
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Tên file</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Miêu tả</th>
                                    <th className="scroll-header" style={{ width: "200px" }}>Đường dẫm s3</th>
                                    <th className="scroll-header" style={{ minWidth: "200px" }}>Tạo lúc</th>
                                    <th style={{ width: "100px" }}><span className="text-left">Hành động</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(dataTable && dataTable?.length > 0) ? (<>
                                    {
                                        dataTable.map((item: any, index: any) => (
                                            <tr key={index}>
                                                <td><div className="text-center">{(index + 1) + (currentPage - 1) * 20}</div></td>
                                                <td><div className="text-center">{item.file_name}</div></td>
                                                <td><div className="text-center">{item.describe}</div></td>
                                                <td><div className="text-center text-[#1c56c0]"><a href={item.file_path}>{item.file_path}</a></div></td>
                                                <td><div className="text-center">{convertTimeToFormat2(item.uploaded_at)}</div></td>
                                                <td className="bg-no-scroll" style={{ width: "100px" }}>
                                                    <div className="flex justify-between">
                                                        <Tooltip title={"detail"}>
                                                            <button><Image src={srcIconView} alt="" className='mt-5' width={40} height={40} /></button>
                                                        </Tooltip>
                                                        <Tooltip title={"delete"}>
                                                            <button><Image src={srcIconDelete} alt="" className='mt-5' width={40} height={40} /></button>
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
                    {isShowForm ? (<FileFormModal isModalOpen={isShowForm} dataFrom={dataFrom} handleCancel={handleCancelForm}></FileFormModal>) : null}
                </div>
            </div>
        </>

    );
};

export default FilePage;
