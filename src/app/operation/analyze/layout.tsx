'use client'
import React, {ReactNode, useContext, useState} from 'react';
import {AppstoreOutlined, SearchOutlined, SettingOutlined, UploadOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Menu} from 'antd';
import Link from "@/app/components/Link";
import {AnalyzeContext, WrappedAnalyzeContextProvider} from "@/app/operation/analyze/context";
import {cn} from "@/utils/utils";

export default function Page({children}: { children: React.ReactNode }) {
  const DebugButton: React.FC<{ name: string, value?: any, children: ReactNode }> = ({name, value, children}) => {
    const {current} = useContext(AnalyzeContext);
    return <Button onClick={() => {
      if (value === undefined) {
        value = prompt(`set ${name} to:`)
      }
      switch (name) {
        case "current":
          if (current === undefined) {
            console.warn("current is undefined")
          } else {
            console.log(`set current to ${value}`)
            current.value = value;
          }
          break;
        default:
          console.warn(`unknown key ${name}`)
      }
      console.log(current)
    }}>
      {children}
    </Button>
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <Link href={"/operation/analyze"} wrapper={false}>
          {"Upload"}
        </Link>
      ),
      key: 'upload',
      icon: <UploadOutlined/>,
    },
    {
      label: (
        <Link href={"/operation/analyze/nav1"} wrapper={false}>
          {"View"}
        </Link>
      ),
      key: 'mail',
      icon: <SearchOutlined/>,
    },
    {
      label: 'Advanced',
      key: 'app',
      icon: <AppstoreOutlined/>,
      disabled: true,
    },
    {
      label: 'Settings',
      key: 'settings',
      icon: <SettingOutlined/>,
      children: [
        {
          type: 'group',
          label: 'Debug',
          children: [
            {
              label: <DebugButton name={"current"}>Set Current</DebugButton>,
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        }
      ],
    },
  ];

  const [current, setCurrent] = useState("upload");

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <WrappedAnalyzeContextProvider>
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
      <div className={cn("mt-24")}>
        {children}
      </div>
    </div>
  </WrappedAnalyzeContextProvider>
};
