"use client";
import { useEffect, useState } from "react";
import './sidebar.scss';
import { usePathname, useRouter } from "next/navigation";
import SideBarItem from "./sideBarItem";
import { FileAddOutlined, FormOutlined, HomeOutlined, MenuOutlined, TableOutlined, UserOutlined, WechatWorkOutlined } from "@ant-design/icons";
import Avatar from "../avatar/avatar";
import { jwtDecode } from "jwt-decode";

interface MenuItem {
  icon: any;
  title: string;
  active: boolean;
  key: string;
  permissions?: string[];
}

const SideBar = () => {

  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState<any>();

  const [menu, setMenu] = useState<MenuItem[]>(
    [
      {
        icon: <HomeOutlined style={{ fontSize: "22px", color: "#fff" }} />,
        title: 'Doanh thu',
        active: false,
        key: "dashboard",
        permissions: ["manager"]
      },
      {
        icon: <UserOutlined style={{ fontSize: "22px", color: "#fff" }} />,
        title: 'Quản lý nhân viên',
        active: false,
        key: "user",
        permissions: ["manager"]
      },
      {
        icon: <FileAddOutlined style={{ fontSize: "22px", color: "#fff" }} />,
        title: 'Quản lý tài liệu',
        active: false,
        key: "document",
        permissions: ["manager"]
      },
      {
        icon: <TableOutlined style={{ fontSize: "22px", color: "#fff" }} />,
        title: 'Quản lý bàn ăn',
        active: false,
        key: "table",
        permissions: ["manager", "staff"]
      },
      {
        icon: <MenuOutlined style={{ fontSize: "22px", color: "#fff" }} />,
        title: "Quản lý menu",
        active: false,
        key: "menu",
        permissions: ["manager"]
      },
      {
        icon: <FormOutlined style={{ fontSize: "22px", color: "#fff" }} />,
        title: "Quản lý đơn hàng",
        active: false,
        key: "order",
        permissions: ["staff"]
      },
      // {
      //   icon: <WechatWorkOutlined style={{ fontSize: "22px", color: "#fff" }} />,
      //   title: "chat_gpt",
      //   active: false,
      //   key: "chat",
      // },
    ]
  );

  const setActive = (item: {
    icon: string;
    title: string;
    active: boolean;
    key: string;
  }) => {
    const updatedMenu = menu.map((element) => ({
      ...element,
      active: element.key === item.key,
    }));
    setMenu(updatedMenu);
  };

  useEffect(() => {
    const pathParts = pathname.split('/');
    const currentPath = pathParts[pathParts.length - 1];
    const item = menu.find((element) => element.key === currentPath);
    const chatItem = menu.find((element) => element.key === "chat");
    setActive(item || chatItem || menu[5]);
    const token = localStorage?.getItem("token");
    const user = token ? jwtDecode(token) : null;
    setUserInfo(user);
  }, [pathname]);



  const handleClickItemMenu = (item: any) => {
    setActive(item)
    router.push(`/${item.key}`)
  }

  return (
    <>
      <div className={`sideBar px-[6px] pb-6 pt-[6px] m-0 flex justify-between flex-col fixed w-[100px] h-screen top-0 left-0 bg-blue-primary`}>
        <ul>
          {menu.map((item, index) => (
            (!item.permissions || item.permissions.includes(userInfo?.role_id)) ?
              <SideBarItem
                title={item.title}
                icon={item.icon}
                active={item.active}
                link={item.key}
                key={index}
                onClick={() => { handleClickItemMenu(item) }}
              ></SideBarItem>
              : null
          )
          )}
        </ul>
        <Avatar size={58} />
      </div>
    </>
  );
}

export default SideBar;
