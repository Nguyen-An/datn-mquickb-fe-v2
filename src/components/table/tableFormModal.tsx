import { DataFrom } from '@/lib/interface';
import { Checkbox, Form, FormProps, GetProp, Input, Modal, notification, QRCode, Select, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImage from '../upload/uploadImage';
import { postDataMenu, putDataMenu } from '@/api/menu';
import { v4 as uuidv4 } from 'uuid';
import { postDataTable } from '@/api/table';
import { COMMON } from '@/constant/common';

const TableFormModal: React.FC<{
    isModalOpen: boolean;
    dataFrom: DataFrom
    handleCancel: (reload?: boolean) => void;
}> = ({ isModalOpen, dataFrom, handleCancel }) => {

    const [title, setTitle] = useState("")
    const [data, setData] = useState({})
    const [form] = Form.useForm();
    const [qrCode, setQrCode] = useState<any>("");

    useEffect(() => {
        if (dataFrom.mode === 'create') {
            setTitle("Thêm mới bàn ăn")
        } else if (dataFrom.mode === 'edit') {
            setTitle("Chỉnh sửa bàn ăn")
            form.setFieldsValue({
                "table_name": dataFrom.data?.table_name ?? "",
                "qr_code": dataFrom.data?.qr_code ?? "",
                "status": dataFrom.data?.status ?? false,
            })

            if (dataFrom.data?.qrCode) setQrCode(dataFrom.data?.qrCode)
        }
    }, [dataFrom])


    const handleOk = async () => {
        const valuesForm = await form.validateFields();
        let payload = {
            "table_name": valuesForm?.table_name ?? "",
            "qr_code": qrCode,
            "status": form.getFieldValue("status")
        }

        if (dataFrom.mode === 'create') {
            try {
                const data = await postDataTable(payload)
                notification["success"]({
                    message: `Thêm mới thành công!`,
                });
                handleCancel(true)
            } catch (error) {
                notification["error"]({
                    message: `Thêm mới thất bại!`,
                });
            }
        } else if (dataFrom.mode === 'edit') {
            try {
                const data = await putDataMenu(payload, dataFrom?.data?.id)
                notification["success"]({
                    message: `Thêm mới thành công!`,
                });
                handleCancel(true)
            } catch (error) {
                notification["error"]({
                    message: `Thêm mới thất bại!`,
                });
            }

        }
    }

    const handleChange = (value: any) => {
        form.setFieldValue("status", value)
    }

    const changeQRCode = () => {
        const newToken = `http://localhost:3000/customer/${uuidv4()}`;
        form.setFieldValue("qr_code", newToken)
        setQrCode(newToken)
    }

    return (
        <>
            <Modal title={title} centered open={isModalOpen} onOk={handleOk} onCancel={() => handleCancel(false)} width={600}>
                <div className='flex mt-5 w-full'>
                    <Form
                        layout="vertical"
                        form={form}
                        style={{ width: "100%" }}
                    >
                        <Form.Item name="table_name" label="Tên bàn ăn">
                            <Input placeholder="Nhập tên bàn ăn" />
                        </Form.Item>
                        <Select
                            className='mb-3'
                            placeholder="Chọn trạng thái"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            options={COMMON.TABLE_STATUS}
                        />
                        <Form.Item name="qr_code" label="Link QR Code">
                            <Input placeholder="" disabled={true} />
                        </Form.Item>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-5 rounded' onClick={() => changeQRCode()}>Đổi mã</button>
                        <QRCode size={120} value={qrCode || '-'} />
                    </Form>
                </div>
            </Modal>
        </>

    );
};

export default TableFormModal;
