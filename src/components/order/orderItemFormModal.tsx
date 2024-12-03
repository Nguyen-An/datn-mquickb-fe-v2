import { DataFrom } from '@/lib/interface';
import { Checkbox, Form, FormProps, GetProp, Input, Modal, notification, Select, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImage from '../upload/uploadImage';
import { postDataMenu, putDataMenu } from '@/api/menu';
import { COMMON } from '@/constant/common';
import { updateStatusOrderItem } from '@/api/order';

const OrderItemFormModal: React.FC<{
    isModalOpen: boolean;
    dataFrom: DataFrom
    handleCancel: (reload?: boolean) => void;
}> = ({ isModalOpen, dataFrom, handleCancel }) => {

    const [title, setTitle] = useState("")
    const [data, setData] = useState({})
    const [status, setStatus] = useState(null)
    const [form] = Form.useForm();
    const [file, setFile] = useState<any>(null);


    useEffect(() => {
        if (dataFrom.mode === 'create') {
            setTitle("Thêm mới đơn hàng")
        } else if (dataFrom.mode === 'edit') {
            setTitle("Chỉnh sửa đơn hàng")
            setStatus(dataFrom.data?.status)
        }
    }, [dataFrom])


    const handleOk = async () => {
        let payload = {
            "status": status
        }

        if (dataFrom.mode === 'create') {
            // try {
            //     const data = await postDataMenu(payload)
            //     notification["success"]({
            //         message: `Thêm mới thành công!`,
            //     });
            //     handleCancel(true)
            // } catch (error) {
            //     notification["error"]({
            //         message: `Thêm mới thất bại!`,
            //     });
            // }
        } else if (dataFrom.mode === 'edit') {
            console.log(payload);
            
            try {
                const data = await updateStatusOrderItem(dataFrom.data?.id, payload)
                notification["success"]({
                    message: `Cập nhật trạng thái thành công!`,
                });
                handleCancel(true)
            } catch (error) {
                notification["error"]({
                    message: `Cập nhật trạng thái thất bại!`,
                });
            }

        }
    }


    const handleChange = (value: any) => {
        setStatus(value)
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
                        <Form.Item label="Cập nhật trạng thái">
                            <Select
                                placeholder="Chọn trạng thái"
                                style={{ width: "100%" }}
                                options={COMMON.ORDER_STATUS}
                                value={status}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>

    );
};

export default OrderItemFormModal;
