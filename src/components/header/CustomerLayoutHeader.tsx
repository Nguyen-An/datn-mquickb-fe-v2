"use client"
import { AppstoreOutlined, HomeFilled, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { ReactNode, useState } from "react"
import "./customerLayoutHeader.scss"
import { useRouter } from "next/navigation";
import { handleLogout } from "@/constant";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Thực đơn',
        key: 'list-menu',
    },
    {
        label: 'Đơn hàng',
        key: 'list-order',
    },
    {
        label: 'Yêu cầu',
        key: 'staff-calls',
    },
    {
        label: 'Chat',
        key: 'chat',
    },
    {
        label: "Đăng xuất",
        key: 'logout',
    },
];

const CustomerLayoutHeader = ({ }: {}) => {
    const [current, setCurrent] = useState('mail');
    const router = useRouter();

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key == 'logout') {
            router.push("/customer/1");
            handleLogout();
        } else {
            router.push(`/customer/${e.key}`);
            setCurrent(e.key);
        }
    };
    return (
        <>
            <div className="customer-header text-[#fff]">
                <Menu overflowedIndicator={<><div className="text[#fff]">mở</div></>} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
            <div className="h-[1px] bg-[#ccc] mb-1"></div>
        </>

    )
}

export default CustomerLayoutHeader
