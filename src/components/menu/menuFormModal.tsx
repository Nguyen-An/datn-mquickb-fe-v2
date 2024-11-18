import { DataFrom } from '@/lib/interface';
import { Checkbox, Form, FormProps, GetProp, Input, Modal, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImage from '../upload/uploadImage';

const MenuFormModal: React.FC<{
    isModalOpen: boolean;
    dataFrom: DataFrom
    handleCancel: () => void;
}> = ({ isModalOpen, dataFrom, handleCancel }) => {

    const [title, setTitle] = useState("")
    const [data, setData] = useState({})

    useEffect(() => {
        if (dataFrom.mode === 'create') {
            setTitle("Thêm mới món ăn")
        } else if (dataFrom.mode === 'edit') {
            setTitle("Chỉnh sửa món ăn")
        }
    }, [dataFrom])

    const [form] = Form.useForm();
    const [file, setFile] = useState<any>(null);

    const handleOk = async () => {
        console.log("file: ", file);
        const valuesForm = await form.validateFields();
        console.log('Giá trị của các trường:', valuesForm);
    }

    return (
        <>
            <Modal title={title} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
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
                        <Form.Item name="is_available" valuePropName="checked" label={null}>
                            <Checkbox>Hoạt động</Checkbox>
                        </Form.Item>
                        <Form.Item name="image_link" label="Upload Ảnh" className='mt-4'>
                            <UploadImage setFile={setFile}></UploadImage>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>

    );
};

export default MenuFormModal;
