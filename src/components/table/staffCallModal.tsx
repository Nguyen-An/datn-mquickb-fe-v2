import { DataFrom } from '@/lib/interface';
import { Button, Modal, notification, QRCode, Select } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getLinkQRCode } from '@/constant';
import { COMMON, getLabelByValue } from '@/constant/common';
import { getStaffCallByOrderId, payTable } from '@/api/order';
import { AnyNode } from 'postcss';
import { formatTimeDifference } from '@/constant/until';

const StaffCallModal: React.FC<{
  isModalOpen: boolean;
  dataFrom: any
  handleCancel: (reload?: boolean) => void;
  handleOk: () => void;
}> = ({ isModalOpen, dataFrom, handleCancel, handleOk }) => {
  const [dataStaffCall, setDataStaffCall] = useState([])

  useEffect(() => {
    getData(dataFrom?.order_id)
  }, [dataFrom])

  const getData = async (orderId: any) => {
    let params = {
      "page": -1,
      "page_size": 9999
    }
    try {
      const data = await getStaffCallByOrderId(orderId, params)
      setDataStaffCall(data?.data?.data);
    } catch (error) {
    }
  }

  return (
    <>
      <Modal title="Yêu cầu từ khách hàng" centered open={isModalOpen} onOk={handleOk} onCancel={() => handleCancel(false)} footer={null}>
        <div className="h-[300px] overflow-auto scrollable-content mt-5">
          {(dataStaffCall && dataStaffCall.length > 0) ?
            dataStaffCall.map((item: any, index: any) =>
            (<div className="mb-3" key={index}>
              <div> {item?.reason} </div>
              <div className="text-[#614848] text-[12px] flex flex-row-reverse"><div>{formatTimeDifference(item?.created_at)}</div></div>
            </div>)
            ) : (<div className='text-center'>Không có yêu cầu gì</div>)}
        </div>
      </Modal>
    </>

  );
};

export default StaffCallModal;
