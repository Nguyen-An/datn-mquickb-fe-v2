import { DataFrom } from '@/lib/interface';
import { Checkbox, Form, FormProps, GetProp, Input, Modal, notification, Select, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImage from '../upload/uploadImage';
import { postDataMenu, putDataMenu } from '@/api/menu';
import { COMMON } from '@/constant/common';

const UserFormModal: React.FC<{
    isModalOpen: boolean;
    dataFrom: DataFrom
    handleCancel: (reload?: boolean) => void;
}> = ({ isModalOpen, dataFrom, handleCancel }) => {

    const [title, setTitle] = useState("")
    const [role, setRole] = useState(null)
    const [form] = Form.useForm();
    const [file, setFile] = useState<any>(null);


    useEffect(() => {
        if (dataFrom.mode === 'create') {
            setTitle("Thêm mới người dùng")
        } else if (dataFrom.mode === 'edit') {
            setTitle("Chỉnh sửa người dùng")
            form.setFieldsValue({
                "name": dataFrom.data?.name ?? "",
                "description": dataFrom.data?.description ?? "",
                "price": dataFrom.data?.price ?? "",
                "category": dataFrom.data?.category ?? "",
                "is_available": dataFrom.data?.is_available ?? false,
            })
            
            if(dataFrom.data?.image_link) setFile(dataFrom.data?.image_link)
        }
    }, [dataFrom])


    const handleOk = async () => {
        const valuesForm = await form.validateFields();
        let payload = {
            "name": valuesForm?.name ?? "",
            "description": valuesForm?.description ?? "",
            "image_link": file ? file : "",
            "price": valuesForm?.price ? Number(valuesForm?.price) : 0,
            "category": valuesForm?.category ?? "",
            "is_available": valuesForm?.is_available ?? false
        }

        if(dataFrom.mode === 'create'){
            try {
                const data = await postDataMenu(payload)
                notification["success"]({
                    message: `Thêm mới thành công!`,
                });
                handleCancel(true)
            } catch (error) {
                notification["error"]({
                    message: `Thêm mới thất bại!`,
                });
            }
        } else if(dataFrom.mode === 'edit') {
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
        setRole(value)
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
                        <Form.Item name="name" label="Tên người dùng">
                            <Input placeholder="Nhập tên người dùng" />
                        </Form.Item>
                        <Form.Item name="description" label="Email">
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                        <Select
                            className='mb-3'
                            placeholder="Chọn trạng thái"
                            style={{ width: "100%" }}
                            options={COMMON.ROLE}
                            value={role}
                            onChange={handleChange}
                        />
                        <Form.Item name="price" label="Số điện thoại">
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>

    );
};

export default UserFormModal;
