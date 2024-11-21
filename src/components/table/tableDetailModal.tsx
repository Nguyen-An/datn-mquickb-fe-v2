import { DataFrom } from '@/lib/interface';
import { Modal, QRCode } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const TableDetailModal: React.FC<{
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
      <Modal title="Chi tiết bàn ăn" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className='flex justify-between mt-5'>
          <div className="order-details">
            <p className='mb-3'><strong>Mã: </strong> {itemData?.id ? itemData?.id : "--"}</p>
            <p className='mb-3'><strong>Tên bàn ăn: </strong> {itemData?.table_name ? itemData?.table_name : "--"}</p>
            <p className='mb-3'><strong>Link QR: </strong> {itemData?.qr_code ? itemData?.qr_code : "--"}</p>
            <p className='mb-3'><strong>Trạng thái: </strong> {itemData?.status ? "Hoạt động" : "Không hoạt động"}</p>
            <p className='mb-3'><strong>Thời gian cập nhật: </strong> {itemData?.updated_at ? moment(itemData?.updated_at).format("DD-MM-YYYY") : "--"} </p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <p><strong>Ảnh:</strong> {itemData?.qr_code ? (<QRCode size={120} value={itemData?.qr_code || '-'} />) : null}</p>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default TableDetailModal;
