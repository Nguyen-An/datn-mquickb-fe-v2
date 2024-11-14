"use client";

import { HomeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";

export default function SideBarItem({
    icon,
    title,
    active,
    onClick,
    link,
    isResponsive = false,
}: {
    icon: string,
    title: string,
    active: boolean,
    onClick: () => void, link: string,
    isResponsive?: boolean,
}) {
    return (
        <li className="sidebar-item">
            <Tooltip placement={isResponsive ? "top" : "right"} title={title} color="#000">
                <Link
                    href={link !== 'home' ? `/${link}` : '/'}
                    className={`text-black gap-2 flex items-center ${active ? 'active' : ''} hover-item-menu text-center flex flex-col justify-center items-center cursor-pointer`}
                    onClick={onClick}
                >
                    {icon}
                    <span className="sidebar-item-title text-[#fff] 2xl:text-[16px] text-[14px]">{title}</span>
                </Link>
            </Tooltip>
        </li>
    )
}
