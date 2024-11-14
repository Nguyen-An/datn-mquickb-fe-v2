import { DataFrom } from '@/lib/interface';
import { Checkbox, Form, GetProp, Input, Modal, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImage from '../upload/uploadImage';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

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
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleOk = () => {
        console.log("fileList: ", fileList);
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
                        <Form.Item label="Tên món ăn">
                            <Input placeholder="Nhập tên món ăn" />
                        </Form.Item>
                        <Form.Item label="Miêu tả">
                            <Input placeholder="Nhập miêu tả" />
                        </Form.Item>
                        <Form.Item label="Loại món ăn">
                            <Input placeholder="Nhập loại món ăn" />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Hoạt động</Checkbox>
                        </Form.Item>
                        <Form.Item label="Upload Ảnh" className='mt-4'>
                            <UploadImage fileList={fileList} setFileList={setFileList}></UploadImage>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>

    );
};

export default MenuFormModal;
