import { DataFrom } from '@/lib/interface';
import { Button, Modal, notification, QRCode, Select } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getLinkQRCode } from '@/constant';
import { COMMON, getLabelByValue } from '@/constant/common';
import { payTable } from '@/api/order';
import { AnyNode } from 'postcss';

const StaffCallModal: React.FC<{
  isModalOpen: boolean;
  dataFrom: any
  handleCancel: (reload?: boolean) => void;
  handleOk: () => void;
}> = ({ isModalOpen, dataFrom, handleCancel, handleOk }) => {
  const [status, setStatus] = useState(null)

  const handleChange = (value: any) => {
    setStatus(value)
  }

  useEffect(() => {
    setStatus(dataFrom?.staff_calls_status)
  }, [dataFrom])
  
  return (
    <>
      <Modal title="Yêu cầu từ khách hàng" centered open={isModalOpen} onOk={handleOk} onCancel={() => handleCancel(false)} footer={null}>
        <div className='flex justify-between mt-5'>
          <div className="order-details">
            <p className='mb-3'><strong>Ghi chú: </strong> Lấy cho a 2 lý cafe em ơi</p>
            <Select
              placeholder="Chọn trạng thái"
              style={{ width: "100%" }}
              options={COMMON.STAFF_CALLS}
              value={status}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </>

  );
};

export default StaffCallModal;
