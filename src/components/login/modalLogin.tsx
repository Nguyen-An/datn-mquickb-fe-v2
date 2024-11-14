import React, { useState } from 'react';
import { Modal, Form, Input, Button, notification, Tabs, TabsProps } from 'antd';
import Image from 'next/image';

// Định nghĩa interface cho props
// 'customerQR' | 'user'
interface UserFormProps {
    isopen: boolean;
    typeLogin: string;
    onCancel: () => void;
}

const ModalLogin = ({
    isopen,
    typeLogin,
    onCancel
}: UserFormProps) => {


    const handleOk = () => {

    };

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: 'customerQR',
            label: 'Đăng nhập với tư khách khách',
            children: 'Content of Tab Pane 1',
        },
        {
            key: 'user',
            label: 'Đăng nhập với account',
            children: 'Content of Tab Pane 2',
        }
    ];

    const loginCustomerQR = (type: string) => {
        return (<>
        
        </>)
    }

    return (
        <>
            <Modal centered open={isopen} onOk={handleOk} onCancel={() => onCancel()} width={700}>
                <Tabs defaultActiveKey="customerQR" items={items} onChange={onChange} />
            </Modal>
        </>
    );
};

export default ModalLogin;