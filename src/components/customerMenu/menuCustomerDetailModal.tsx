import { DataFrom } from '@/lib/interface';
import { Modal } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const MenuCustomerDetailModal: React.FC<{
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
      <Modal title="Chi tiết món ăn" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={350}>
        <div className='flex justify-between mt-5'>
          <div className="order-details w-[180px]">
            <p className='mb-3'><strong>Mã món ăn: </strong> {itemData?.id ? itemData?.id : "--"}</p>
            <p className='mb-3'><strong>Tên món: </strong> {itemData?.name ? itemData?.name : "--"}</p>
            <p className='mb-3'><strong>Miêu tả: </strong> {itemData?.description ? itemData?.description : "--"}</p>
            <p className='mb-3'><strong>Loại món: </strong> {itemData?.category ? itemData?.category : "--"}</p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <p><strong>Ảnh:</strong> {itemData?.image_link ? (<Image src={itemData?.image_link} alt="My Image" width={120} height={120} />) : null}</p>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default MenuCustomerDetailModal;
