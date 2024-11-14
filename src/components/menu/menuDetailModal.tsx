import { Modal } from 'antd';
import Image from 'next/image';
import React from 'react';

const MenuDetailModal: React.FC<{
  isModalOpen: boolean;
  handleCancel: () => void;
  handleOk: () => void;
}> = ({ isModalOpen, handleCancel, handleOk }) => {

  return (
    <>
      <Modal title="Chi tiết món ăn" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='flex justify-between mt-5'>
          <div className="order-details">
            <p className='mb-3'><strong>Mã: </strong> 1</p>
            <p className='mb-3'><strong>Tên món: </strong> Bánh rán</p>
            <p className='mb-3'><strong>Miêu tả: </strong> Món ăn số 1 Việt Nam</p>
            <p className='mb-3'><strong>Loại món: </strong> Món tráng miệng</p>
            <p className='mb-3'><strong>Trạng thái: </strong> Hiển thị</p>
            <p className='mb-3'><strong>Thời gian cập nhật: </strong> 14/11/2024 </p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <p><strong>Ảnh:</strong> <Image src="https://mquickb.s3.amazonaws.com/d4d7a80b-4c5f-41ae-a36a-71af571e88ea.jpg" alt="" width={120} height={120} /></p>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default MenuDetailModal;
