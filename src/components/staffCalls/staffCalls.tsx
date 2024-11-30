"use client"

import { Button } from "antd";

const StaffCalls = () => {
    return (
        <>
            <div className='bg-[#000816] text-[#fff]'>
                <div className='flex justify-center text-[18px] leading-[30px] mt-4 mb-20'>Gọi nhân viên</div>
                <div><Button type="primary" block>Call</Button></div>

                <div className='flex bg-[#fff] text-[#000816] rounded-[6px] py-1 px-4 justify-center'>
                    Đã gọi nhân viên - đang xử lý
                </div>
            </div >
        </>
    );
};

export default StaffCalls;
