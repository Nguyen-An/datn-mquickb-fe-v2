"use client"

import { getStaffCallByOrderId, postStaffCall } from "@/api/order";
import { formatTimeDifference } from "@/constant/until";
import { Button, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

const StaffCalls = () => {

    const [value, setValue] = useState("")
    const [orderId, setOrderId] = useState()
    const [dataStaffCall, setDataStaffCall] = useState([])

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e?.target?.value);
    };

    const handleStaffCall = async () => {
        let payload = {
            "order_id": orderId,
            "reason": value
        }
        try {
            const data = await postStaffCall(payload)
            notification.open({
                message: 'Gửi yêu cầu thành công!',
                type: 'success'
            });
            setValue("")
            getData(orderId)
        } catch (error) {
            notification.open({
                message: 'Gửi yêu cầu thất bại, vui lòng thực hiện sau giây lát!',
                type: 'error'
            });
        }
    };

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

    useEffect(() => {
        const user = localStorage.getItem('user');
        setOrderId(JSON.parse(user || '')?.order_ID)
        getData(JSON.parse(user || '')?.order_ID)
    }, [])

    return (
        <>
            <div className='bg-[#000816] text-[#fff]'>
                <div className='flex justify-center text-[18px] leading-[30px] mt-4 mb-5'>Gọi nhân viên</div>
                <TextArea
                    showCount
                    maxLength={100}
                    onChange={onChange}
                    value={value}
                    placeholder="Hãy nhập yêu cầu cho nhân viên"
                    style={{ height: 80, resize: 'none' }}
                />
                <div className="my-5"><Button type="primary" block onClick={() => handleStaffCall()}>Yêu cầu</Button></div>
                <div className="flex justify-center my-5"><div className="text-[18px] leading-[30px]">Lịch sử</div></div>
                <div className="h-[calc(100vh-370px)] overflow-auto scrollable-content">
                    {(dataStaffCall && dataStaffCall.length > 0) ?
                        dataStaffCall.map((item: any, index: any) =>
                        (<div className="mb-3" key={index}>
                            <div> {item?.reason} </div>
                            <div className="text-[#ccc] text-[12px] flex flex-row-reverse"><div>{formatTimeDifference(item?.created_at)}</div></div>
                        </div>)
                        ) : null}
                </div>

            </div >
        </>
    );
};

export default StaffCalls;
