import Image from "next/image"
import { ReactNode } from "react"
import icon from '@/../public/icons/index';

const Nav = () => {
  const srcIconlogo = icon['iconlogo']

    return (
        <>
            <div className="fixed top-0 left-[100px] bg-[#fff] h-[70px] flex justify-center" style={{ width: "calc(100vw - 100px)" }}>
                <div className="mt-[5px]">
                    <Image src={srcIconlogo} alt="" className='rounded-[10px]' width={60} height={60} />
                </div>
            </div>
        </>
    )
}

export default Nav
