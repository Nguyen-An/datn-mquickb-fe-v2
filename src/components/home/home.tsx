"use client";
import React, { useState } from 'react';
import icon from '@/../public/icons/index';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import ModalLogin from '../login/modalLogin';

const Home = () => {
  const router = useRouter()
  const srcIconBrownWatch = icon['iconBrownWatch']
  const srcIconCake = icon['iconCake']
  const srcIconChefAvatar = icon['iconChefAvatar']
  const srcIconKitchenTool = icon['iconKitchenTool']
  const srcIconQRCode = icon['iconQRCode']
  const srcIconlogo = icon['iconlogo']
  const srcIconArrowRight = icon['iconArrowRight']

  const [isopenModalLogin, setIsopenModalLogin] = useState<boolean>(false);
  const [typeLogin, setTypeLogin] = useState<string>("customerQR");

  const handleShowFormLogin = (type: string) => {
    setTypeLogin(type)
    setIsopenModalLogin(true)
    // router.push('/chat')
  }

  const handleCloseModalLogin = () => {
    setIsopenModalLogin(false);
  };

  return (
    <>
      <div className='bg-landing-page h-[90vh] bg-cover bg-center bg-no-repeat relative'>
        <div className='w-full flex justify-center absolute top-[0] mt-8'>
          <div className='w-[90vw] h-[90px] bg-[#fbfbff] rounded-[50px] py-[10px] px-8 flex justify-between'>
            <Image src={srcIconlogo} alt="" className='rounded-[10px]' width={70} height={70} />
            <div className='h-full flex items-center'>
              <div className='flex bg-[#f1553a] py-3 px-8 rounded-[50px] text-[#fff] text-[20px] pacifico-regular cursor-pointer' onClick={() => {handleShowFormLogin("user")}}>
                Bắt đầu <Image src={srcIconArrowRight} alt="" className='ml-2' width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full text-center absolute bottom-[190px] z-1'>
          <div className='pacifico-regular text-[#fff] text-[30px]'>RESTAURANT <br /> MQuickB</div>
          <div className='flex justify-center mt-2 pacifico-regular'>
            <div className='bg-[#fdf5f5] rounded-s-[50px] text-[20px] px-4 py-2 cursor-pointer ' onClick={() => {handleShowFormLogin("customerQR")}}>Chat with bot</div>
            <div className='bg-[#FF4500] rounded-e-[50px] text-[20px] px-4 py-2 cursor-pointer' onClick={() => {handleShowFormLogin("user")}}>Đăng nhập</div>
          </div>
        </div>
      </div>
      <div>
        <div className='flex'>
          <div className='h-[300px] w-[20%] bg-[#C7ACB0] flex flex-col items-center'>
            <Image src={srcIconKitchenTool} alt="" className='mt-5' width={120} height={120} />
            <div className='are-you-serious-regular text-[22px] text-center'>
              Welcom Food <br /> Ordering System
            </div>
          </div>
          <div className='h-[300px] w-[20%] bg-[#D7CCDF] flex flex-col items-center'>
            <Image src={srcIconCake} alt="" className='mt-5' width={120} height={120} />
            <div className='are-you-serious-regular text-[22px] text-center'>
              RESTAURANT
            </div>
            <div className='text-[15px] text-center pacifico-regular  px-3'>
              Trải nghiệm dịch vụ gọi đồ ăn tiện lợi và nhanh chóng ngay tại MQuickB
            </div>
          </div>
          <div className='h-[300px] w-[20%] bg-[#9F7C7B] flex flex-col items-center'>
            <Image src={srcIconChefAvatar} alt="" className='mt-5' width={120} height={120} />
            <div className='are-you-serious-regular text-[22px] text-center'>
              Welcome <br /> MQuickB
            </div>
            <div className='text-[15px] text-center pacifico-regular  px-3'>
              Các món ăn được chuẩn bị bởi đội ngũ đầu bếp chuyên nghiệp, giàu kinh nghiệm và tận tâm
            </div>
          </div>
          <div className='h-[300px] w-[20%] bg-[#D7CCDF] flex flex-col items-center'>
            <Image src={srcIconQRCode} alt="" className='mt-5' width={120} height={120} />
            <div className='are-you-serious-regular text-[22px] text-center'>
              FOODER <br /> ORDERING
            </div>
            <div className='text-[15px] text-center pacifico-regular  px-3'>
              Chỉ cần quét mã, chọn món yêu thích và đặt hàng ngay trong vài giây
            </div>
          </div>
          <div className='h-[300px] w-[20%] bg-[#C7ACB0] flex flex-col items-center'>
            <Image src={srcIconBrownWatch} alt="" className='mt-5' width={120} height={120} />
            <div className='are-you-serious-regular text-[22px] text-center'>
              10h-14h <br />  17h-23h
            </div>
            <div className='text-[15px] text-center pacifico-regular  px-3'>
              Thưởng thức những món ngon bất cứ khi nào bạn muốn
            </div>
          </div>
        </div>
      </div>
      {isopenModalLogin ? (<><ModalLogin isopen={isopenModalLogin} typeLogin={typeLogin} onCancel={handleCloseModalLogin}></ModalLogin></>) : null}
    </>
  );
};

export default Home;
