import { DataFrom } from '@/lib/interface';
import { Button, Modal, notification, QRCode } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getLinkQRCode } from '@/constant';
import { COMMON, getLabelByValue } from '@/constant/common';
import { payTable } from '@/api/order';

const TableDetailModal: React.FC<{
  isModalOpen: boolean;
  dataFrom: DataFrom
  handleCancel: (reload?: boolean) => void;
  handleOk: () => void;
}> = ({ isModalOpen, dataFrom, handleCancel, handleOk }) => {

  const [itemData, setItemData] = useState<any>(null)

  useEffect(() => {
    setItemData(dataFrom.data)
  }, [dataFrom])

  const handlePay = async () => {
    try {
      const data = await payTable(dataFrom.data?.id, {})
      notification["success"]({
        message: `Thanh toán bàn thành công!`,
      });
      handleCancel(true)
    } catch (error) {
      notification["error"]({
        message: `Cập nhật trạng thái thất bại!`,
      });
    }
  }


  return (
    <>
      <Modal title="Chi tiết bàn ăn" centered open={isModalOpen} onOk={handleOk} onCancel={() => handleCancel(false)} footer={null}>
        <div className='flex justify-between mt-5'>
          <div className="order-details">
            <p className='mb-3'><strong>Mã: </strong> {itemData?.id ? itemData?.id : "--"}</p>
            <p className='mb-3'><strong>Tên bàn ăn: </strong> {itemData?.table_name ? itemData?.table_name : "--"}</p>
            <p className='mb-3'><strong>Link QR: </strong> {(itemData?.qr_code)}</p>
            <p className='mb-3'><strong>Trạng thái: </strong> {getLabelByValue(COMMON.TABLE_STATUS, itemData?.status)}</p>
            <p className='mb-3'><strong>Thời gian cập nhật: </strong> {itemData?.updated_at ? moment(itemData?.updated_at).format("DD-MM-YYYY") : "--"} </p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <p><strong>Ảnh:</strong> {itemData?.qr_code ? (<QRCode size={120} value={getLinkQRCode(itemData?.qr_code)} />) : null}</p>
            {
              (itemData?.status == 'in_use' || itemData?.order_id) ? <Button type="dashed" className='mt-2' onClick={() => handlePay()}>Thanh toán</Button> : <></>
            }
          </div>
        </div>
      </Modal>
    </>

  );
};

export default TableDetailModal;
