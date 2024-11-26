import Image from 'next/image';
import { useState } from 'react';

const ListMenuPage = () => {

    return (
        <>
            <div className=''>Menu Quán</div>
            <div className=''>
                <div>
                    <div>
                        <Image src="https://mquickb.s3.amazonaws.com/5f4dcc77-8e81-4657-be0f-e03b47d63760.jpg" alt="" className='mt-5' width={100} height={100} />
                    </div>
                    <div>
                        <div>Bánh mỳ Việt Nam</div>
                        <div>100 000 đ</div>
                    </div>
                    <div>
                        <button ></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListMenuPage;
