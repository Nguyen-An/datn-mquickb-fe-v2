import { DataFrom } from '@/lib/interface';
import { Checkbox, Form, FormProps, GetProp, Input, Modal, notification, Select, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImage from '../upload/uploadImage';
import { postDataMenu, putDataMenu } from '@/api/menu';
import { COMMON } from '@/constant/common';
import { postDataUser } from '@/api/user';

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
                "email": dataFrom.data?.email ?? "",
                "phone_number": dataFrom.data?.phone_number ?? "",
            })

            setRole(dataFrom.data?.role)
        }
    }, [dataFrom])


    const handleOk = async () => {
        const valuesForm = await form.validateFields();
        let payload = {
            "name": valuesForm?.name ?? "",
            "email": valuesForm?.email ?? "",
            "role": role,
            "phone_number": valuesForm?.phone_number ?? ""
        }

        if (dataFrom.mode === 'create') {
            try {
                const data = await postDataUser(payload)
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
                        <Form.Item name="email" label="Email">
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item label="Role">
                            <Select
                                placeholder="Chọn trạng thái"
                                style={{ width: "100%" }}
                                options={COMMON.ROLE}
                                value={role}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item name="phone_number" label="Số điện thoại">
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>

    );
};

export default UserFormModal;
