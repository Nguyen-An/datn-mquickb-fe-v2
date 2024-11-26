"use client"
import { AppstoreOutlined, HomeFilled, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { ReactNode, useState } from "react"
import "./customerLayoutHeader.scss"

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Thực đơn',
        key: 'menu',
    },
    {
        label: 'Đơn hàng',
        key: 'order',
    },
    {
        key: 'logout',
        label: "Đăng xuất",
    },
];

const CustomerLayoutHeader = ({ }: {}) => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>
            <div className="customer-header bg-[#000816] text-[#fff]">
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
            <div className="h-[1px] bg-[#ccc] mb-1"></div>
        </>

    )
}

export default CustomerLayoutHeader
