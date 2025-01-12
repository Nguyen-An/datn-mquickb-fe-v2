import { DataFrom } from '@/lib/interface';
import { Checkbox, Form, FormProps, GetProp, Input, Modal, notification, QRCode, Select, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImage from '../upload/uploadImage';
import { postDataMenu, putDataMenu } from '@/api/menu';
import { v4 as uuidv4 } from 'uuid';
import { postDataTable, putDataTable } from '@/api/table';
import { COMMON } from '@/constant/common';
import { getLinkQRCode } from '@/constant';
import UploadFileChatBot from '../upload/uploadFileChatBot';
import { uploadFileForm } from '@/api/file';

const FileFormModal: React.FC<{
    isModalOpen: boolean;
    dataFrom: DataFrom
    handleCancel: (reload?: boolean) => void;
}> = ({ isModalOpen, dataFrom, handleCancel }) => {

    const [title, setTitle] = useState("")
    const [form] = Form.useForm();
    const [file, setFile] = useState<any>([]);

    useEffect(() => {
        setTitle("Thêm mới tài liệu")
    }, [])


    const handleOk = async () => {
        const valuesForm = await form.validateFields();
        if (!file[0]) {
            notification["error"]({
                message: "Vui lòng chọn tài liệu!",
            });
            return;
        }

        let payload = {
            "file_name": file[0]?.filename,
            "file_path_s3": file[0]?.file_url,
            "describe": valuesForm?.describe,
            "file_path": file[0]?.file_url_s3,
            "key": file[0]?.filename,
        }

        try {
            const data = await uploadFileForm(payload)
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

    return (
        <>
            <Modal title={title} centered open={isModalOpen} onOk={handleOk} onCancel={() => handleCancel(false)} width={600}>
                <div className='flex mt-5 w-full'>
                    <Form
                        layout="vertical"
                        form={form}
                        style={{ width: "100%" }}
                    >
                        <Form.Item name="describe" label="Miêu tả tài liệu" rules={[{ required: true, message: 'Miêu tả tài liệu không được phép trống' }]}>
                            <Input placeholder="Nhập miêu tả tài liệu" />
                        </Form.Item>
                        <Form.Item name="image_link" label="Upload File" className='mt-4'>
                            <UploadFileChatBot file={file} setFile={setFile}></UploadFileChatBot>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>

    );
};

export default FileFormModal;
