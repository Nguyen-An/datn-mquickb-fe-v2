import { DataFrom } from '@/lib/interface';
import { Modal } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const MenuDetailModal: React.FC<{
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
      <Modal title="Chi tiết món ăn" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className='flex justify-between mt-5'>
          <div className="order-details">
            <p className='mb-3'><strong>Mã: </strong> {itemData?.id ? itemData?.id : "--"}</p>
            <p className='mb-3'><strong>Tên món: </strong> {itemData?.name ? itemData?.name : "--"}</p>
            <p className='mb-3'><strong>Miêu tả: </strong> {itemData?.description ? itemData?.description : "--"}</p>
            <p className='mb-3'><strong>Loại món: </strong> {itemData?.category ? itemData?.category : "--"}</p>
            <p className='mb-3'><strong>Trạng thái: </strong> {itemData?.is_available ? "Hoạt động" : "Không hoạt động"}</p>
            <p className='mb-3'><strong>Thời gian cập nhật: </strong> {itemData?.created_at ? moment(itemData?.created_at).format("DD-MM-YYYY") : "--"} </p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <p><strong>Ảnh:</strong> <Image src={itemData?.image_link} alt="" width={120} height={120} /></p>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default MenuDetailModal;
