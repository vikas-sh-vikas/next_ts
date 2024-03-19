"use client";
import React, { useState } from "react";
// import './index.css';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { FaUser, FaBox, FaFileInvoice, FaBars } from "react-icons/fa";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Option 3", "3", <ContainerOutlined />),

  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),

    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex">
      <div style={{ width: 256 }}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div className="w-full h-full">
        <div className="lg:col-span-10 sm:col-span-12 col-span-12 m-4 grid sm:grid-cols-2 gap-4">
          <div className="bg-indigo-100 hover:bg-indigo-200 rounded-lg shadow flex justify-center items-center flex-col">
            <FaUser className="text-5xl text-gray-600"></FaUser>
            <label className="text-4xl uppercase text-gray-600 my-3 font-bold">
              Customer
            </label>
          </div>
          <div className=" bg-indigo-100 hover:bg-indigo-200 rounded-lg shadow flex justify-center items-center flex-col">
            <FaBox className="text-5xl text-gray-600"></FaBox>
            <label className="text-4xl uppercase text-gray-600 my-3 font-bold">
              Supplier
            </label>
          </div>
          <div className="bg-indigo-100 hover:bg-indigo-200 rounded-lg shadow flex justify-center items-center flex-col">
            <FaFileInvoice className="text-5xl text-gray-600"></FaFileInvoice>
            <label className="text-4xl uppercase text-gray-600 my-3 font-bold">
              Invoice
            </label>
          </div>
          <div className="bg-indigo-100 rounded-lg hover:bg-indigo-200 shadow flex justify-center items-center flex-col">
            <FaUser className="text-5xl text-gray-600"></FaUser>
            <label className="text-4xl uppercase text-gray-600 my-3 font-bold">
              User
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
