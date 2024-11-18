/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import icon from '@/../public/icons/index';
import { Dropdown, MenuProps, notification, Space } from "antd";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import ProfileForm, { UserFormData } from './ProfileForm';
import { handleLogout } from '@/constant';
import ChangePasswordForm from './changePasswordForm';

export default function Avatar({ size }: { size: number }) {
    const srcIconViewProfile = icon['iconViewProfile']
    const srcIconEditProfile = icon['iconEditProfile']
    const srcIconSignOut = icon['iconSignOut']
    const srcIconChangePassword = icon['iconChangePassword']

    const [isopen, setOpenProfileForm] = useState(false);
    const [isopenFormChangepassword, setIsopenFormChangepassword] = useState<boolean>(false);
    const [data, setDataForm] = useState<UserFormData>({
        typeForm: 'view',
        data: null
    });
    const router = useRouter()

    useEffect(() => {
        const token = localStorage?.getItem("token");
        const user = token ? jwtDecode(token) : null;
        setUserInfo(user);
    }, []);

    const [userInfo, setUserInfo] = useState<any>();
    const openModalProfile = (typeForm: 'view' | 'create') => {
        setDataForm({
            typeForm: typeForm,
            data: null
        })
        setOpenProfileForm(true);
    }
    const items: MenuProps['items'] = [
        {
            label: <div className="outlineDropdownItem" onClick={() => openModalProfile('view')}><Image src={srcIconViewProfile} alt="" width={20} height={20} /> Xem thông tin cá nhân</div>,
            key: '0',
        },
        {
            label: <div className="outlineDropdownItem" onClick={() => openModalProfile('create')}><Image src={srcIconEditProfile} alt="" width={20} height={20} />Chỉnh sửa thông tin cá nhân</div>,
            key: '1',
        },
        {
            label: <div className="outlineDropdownItem" onClick={() => openModalChangePassword()}><Image src={srcIconChangePassword} alt="" width={20} height={20} />Đổi mật khẩu</div>,
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label: <div className="outlineDropdownItem" onClick={() => handleSignOut()}><Image src={srcIconSignOut} alt="" width={20} height={20} />Đăng xuất</div>,
            key: '4',
        },
    ];
    const handleSave = () => {
    };
    const handleSignOut = () => {
        router.push('/')
        handleLogout();
    }

    const handleCancel = () => {
        setOpenProfileForm(false);
    };

    const openModalChangePassword = () => {
        setIsopenFormChangepassword(true);
    }

    const handleCancelFormChangePassword = () => {
        setIsopenFormChangepassword(false);
    }

    return (
        <>
            <div className="avatar">
                <Dropdown className="outLineAvatar" menu={{ items }} placement="topRight" trigger={['click']} arrow>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            {/* <AvatarComon srcImg={user.link_avatar} email={userInfo?.email} width={`${size}px`} height={`${size}px`} fontSize={`${Math.floor(size / 1.6)}px`} /> */}
                            hello
                        </Space>
                    </a>
                </Dropdown>
            </div>
            {isopen ? (<>
                <ProfileForm isopen={isopen} data={data} onSave={handleSave} onCancel={handleCancel} />
            </>) : null}
            {isopenFormChangepassword ? (<ChangePasswordForm isopen={isopenFormChangepassword} type="user" onCancel={handleCancelFormChangePassword} nextRouter={false} />) : null}
        </>
    );
}
