/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, notification, Upload, UploadProps } from 'antd';


export interface UserFormData {
    typeForm: 'create' | 'view';
    data: any;
}

// Định nghĩa interface cho props
interface UserFormProps {
    isopen: boolean;
    data: UserFormData;
    onSave: (values: any) => void;
    onCancel: () => void;
}

const userNULL = {
    company_id: 0,
    company_name: "--",
    email: "--",
    id: 0,
    department: "--",
    user_name: "--",
    link_avatar: null
}


const ProfileForm = ({ isopen, data, onSave, onCancel }: UserFormProps) => {

    return (
        <>
            <Modal
                title={null}
                centered
                open={isopen}
                onOk={() => onSave(false)}
                onCancel={() => onCancel()}
                width={530}
                footer={false}
            >
                ProfileForm
            </Modal>
        </>

    );
};

export default ProfileForm;