import { DataFrom } from '@/lib/interface';
import { Modal } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const UserDetailModal: React.FC<{
  isModalOpen: boolean;
  dataFrom: DataFrom
  handleCancel: () => void;
  handleOk: () => void;
}> = ({ isModalOpen, dataFrom, handleCancel, handleOk }) => {

  const [itemData, setItemData] = useState<any>(null)

  useEffect(() => {
    setItemData(dataFrom.data)
  }, [dataFrom])

  return (
    <>
      <Modal title="Chi tiết người dùng" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className='flex justify-between mt-5'>
          <div className="order-details">
            <p className='mb-3'><strong>Mã: </strong> {itemData?.id ? itemData?.id : "--"}</p>
            <p className='mb-3'><strong>Tên người dùng: </strong> {itemData?.name ? itemData?.name : "--"}</p>
            <p className='mb-3'><strong>Email: </strong> {itemData?.email ? itemData?.email : "--"}</p>
            <p className='mb-3'><strong>Role: </strong> {itemData?.role ? itemData?.role : "--"}</p>
            <p className='mb-3'><strong>Số điện thoại: </strong> {itemData?.phone_number ? itemData?.phone_number : "--"}</p>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default UserDetailModal;
