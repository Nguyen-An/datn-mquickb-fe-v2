import { DataFrom } from '@/lib/interface';
import { Form, Input, Modal, notification, Select } from 'antd';
import React, { useEffect } from 'react';
import { postDataUser, putDataUser } from '@/api/user';
import { COMMON } from '@/constant/common';

const UserFormModal: React.FC<{
    isModalOpen: boolean;
    dataFrom: DataFrom;
    handleCancel: (reload?: boolean) => void;
}> = ({ isModalOpen, dataFrom, handleCancel }) => {
    const [title, setTitle] = React.useState<string>('');
    const [form] = Form.useForm();

    useEffect(() => {
        if (!dataFrom) return;

        if (dataFrom.mode === 'create') {
            setTitle('Thêm mới người dùng');
            form.resetFields(); // Xóa các giá trị cũ
        } else if (dataFrom.mode === 'edit') {
            setTitle('Chỉnh sửa người dùng');
            form.setFieldsValue({
                name: dataFrom.data?.name ?? '',
                email: dataFrom.data?.email ?? '',
                phone_number: dataFrom.data?.phone_number ?? '',
                role: dataFrom.data?.role ?? null,
            });
        }
    }, [dataFrom]);

    const handleOk = async () => {
        const valuesForm = await form.validateFields();

        try {
            const payload = {
                name: valuesForm.name ?? '',
                email: valuesForm.email ?? '',
                role: valuesForm.role ?? null,
                phone_number: valuesForm.phone_number ?? '',
            };

            if (dataFrom.mode === 'create') {
                await postDataUser(payload);
                notification.success({
                    message: 'Thêm mới thành công!',
                });
            } else if (dataFrom.mode === 'edit') {
                await putDataUser(payload, dataFrom?.data?.id);
                notification.success({
                    message: 'Chỉnh sửa thành công!',
                });
            }

            handleCancel(true);
        } catch (error: any) {
            switch (error?.response?.data?.error_code) {
                case "EMAIL_IS_ALREADY_IN_USE":
                    notification.error({
                        message: error?.response?.data?.error_messages,
                    });
                    break;

                default:
                    notification.error({
                        message: dataFrom.mode === 'create' ? 'Thêm mới thất bại!' : 'Chỉnh sửa thất bại!',
                    });
                    break;
            }

        }
    };

    return (
        <Modal
            title={title}
            centered
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => handleCancel(false)}
            okText="Lưu"
            cancelText="Hủy"
            width={600}
        >
            <div className="flex mt-5 w-full">
                <Form
                    layout="vertical"
                    form={form}
                    style={{ width: '100%' }}
                >
                    <Form.Item
                        name="name"
                        label="Tên người dùng"
                        rules={[{ required: true, message: 'Tên người dùng không được phép trống' }]}
                    >
                        <Input placeholder="Nhập tên người dùng" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Email không được phép trống' }]}
                    >
                        <Input placeholder="Nhập email" disabled={dataFrom.mode === 'edit'} />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Role không được phép trống' }]}
                    >
                        <Select
                            placeholder="Chọn role"
                            style={{ width: '100%' }}
                            options={COMMON.ROLE}
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Số điện thoại không được phép trống' }]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default UserFormModal;
