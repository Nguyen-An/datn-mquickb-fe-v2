import React, { useState } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import Image from 'next/image';

// Định nghĩa interface cho props
interface UserFormProps {
    isopen: boolean;
    type: 'user' | 'admin';
    userId?: string | number;
    onCancel: (nextRouter: boolean) => void;
    nextRouter: boolean;
}

const ChangePasswordForm = ({
    nextRouter,
    isopen,
    type,
    userId, // userId for change password by admin
    onCancel
}: UserFormProps) => {

    const handleFormChangePasswordValuesChange = () => {

    };

    const handleOk = () => {

    };

    const changePassword = async (values: any) => {

    }

    const adminChangePassword = async (values: any) => {

    }

    return (
        <>
            <Modal centered open={isopen} onOk={handleOk} onCancel={() => onCancel(nextRouter)} footer={null} width={704} destroyOnClose={true} maskClosable={false}>
                ChangePasswordForm
            </Modal>
        </>
    );
};

export default ChangePasswordForm;