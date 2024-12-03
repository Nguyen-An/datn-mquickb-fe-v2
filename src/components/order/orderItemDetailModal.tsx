import { DataFrom } from '@/lib/interface';
import { Modal } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { convertTimeToFormat } from '@/constant/until';

const OrderItemDetailModal: React.FC<{
  isModalOpen: boolean;
  dataFrom: DataFrom
  handleCancel: () => void;
  handleOk: () => void;
}> = ({ isModalOpen, dataFrom, handleCancel, handleOk }) => {

  const [itemData, setItemData] = useState<any>(null)

  useEffect(() => {
    setItemData(dataFrom.data)
    console.log(dataFrom.data);
    
  }, [dataFrom])

  return (
    <>
      <Modal title="Chi tiết đơn hàng" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className='flex justify-between mt-5'>
          <div className="order-details">
            <p className='mb-3'><strong>Mã: </strong> {itemData?.id ? `Đơn hàng số ${itemData?.id}` : "--"}</p>
            {/* <p className='mb-3'><strong>Tên bàn: </strong> {itemData?.menu_item_name ? itemData?.menu_item_name : "--"}</p> */}
            <p className='mb-3'><strong>Tên món ăn: </strong> {itemData?.menu_item_name ? itemData?.menu_item_name : "--"}</p>
            <p className='mb-3'><strong>Số lượng: </strong> {itemData?.quantity ? itemData?.quantity : "--"}</p>
            <p className='mb-3'><strong>Trạng thái: </strong> {itemData?.status}</p>
            <p className='mb-3'><strong>Lần cập nhật gần nhất: </strong> {itemData?.updated_at ? convertTimeToFormat(itemData?.updated_at) : "--"} </p>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default OrderItemDetailModal;
