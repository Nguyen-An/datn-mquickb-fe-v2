import { DataFrom } from '@/lib/interface';
import { Checkbox, Form, FormProps, GetProp, Input, Modal, notification, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImage from '../upload/uploadImage';
import { postDataMenu, putDataMenu } from '@/api/menu';

const OrderItemFormModal: React.FC<{
    isModalOpen: boolean;
    dataFrom: DataFrom
    handleCancel: (reload?: boolean) => void;
}> = ({ isModalOpen, dataFrom, handleCancel }) => {

    const [title, setTitle] = useState("")
    const [data, setData] = useState({})
    const [form] = Form.useForm();
    const [file, setFile] = useState<any>(null);


    useEffect(() => {
        if (dataFrom.mode === 'create') {
            setTitle("Thêm mới món ăn")
        } else if (dataFrom.mode === 'edit') {
            setTitle("Chỉnh sửa món ăn")
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

    return (
        <>
            <Modal title={title} centered open={isModalOpen} onOk={handleOk} onCancel={() => handleCancel(false)} width={600}>
                <div className='flex mt-5 w-full'>
                    <Form
                        layout="vertical"
                        form={form}
                        style={{ width: "100%" }}
                    >
                        <Form.Item name="name" label="Tên món ăn">
                            <Input placeholder="Nhập tên món ăn" />
                        </Form.Item>
                        <Form.Item name="description" label="Miêu tả">
                            <Input placeholder="Nhập miêu tả" />
                        </Form.Item>
                        <Form.Item name="category" label="Loại món ăn">
                            <Input placeholder="Nhập loại món ăn" />
                        </Form.Item>
                        <Form.Item name="price" label="Đơn giá">
                            <Input placeholder="Nhập đơn giá món ăn" />
                        </Form.Item>
                        <Form.Item name="is_available" valuePropName="checked" label={null}>
                            <Checkbox>Hoạt động</Checkbox>
                        </Form.Item>
                        <Form.Item name="image_link" label="Upload Ảnh" className='mt-4'>
                            <UploadImage file={file} setFile={setFile}></UploadImage>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>

    );
};

export default OrderItemFormModal;
