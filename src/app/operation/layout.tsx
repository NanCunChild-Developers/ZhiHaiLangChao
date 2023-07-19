'use client'
import { cn } from "@/utils/utils"
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined, QuestionOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Divider, Layout, Menu, Row, theme } from 'antd';
import Link from "@/app/components/Link";
import { globals } from "@/globals";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[];
  text: string;
};

function getItem(
  labelText: string,
  key: React.Key,
  link: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link href={"/operation/" + link}>{labelText}</Link>,
    text: labelText,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('分析', 'analyze', "analyze", <PieChartOutlined />),
  getItem('Option 2', '2', "", <DesktopOutlined />),
  getItem('User', 'sub1', "", <UserOutlined />, [
    getItem('Tom', '3', ""),
    getItem('Bill', '4', "",),
    getItem('Alex', '5', "",),
  ]),
  getItem('Team', 'sub2', "", <TeamOutlined />, [getItem('Team 1', '6', ""), getItem('Team 2', '8', "",)]),
  getItem('Files', '9', "", <FileOutlined />),
];

// function findTextByKeyPath(keyPath: string[]): string[] {
//   const result: string[] = [];
//   let subItems = items;
//   for (const key of keyPath.reverse()) {
//     const item = subItems.find((item) => item?.key === key);
//     if (item) {
//       result.push(item?.text);
//       subItems = item?.children || [];
//     } else {
//       result.push(key);
//     }
//   }
//   return result;
// }

export default function Page({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>(["-"]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        padding: 0,
        background: colorBgContainer,
        height: "48px",
        borderBottom: "1px solid #e8e8e8",
      }}>
        <Row>
          <Link href={"/"}>
            <Row className={cn("text-2xl mx-32 mt-8 gap-16")}>
              <img style={{
                height: "32px",
              }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
              {
                "智海浪潮" // TODO: use i18n & 左边可以放logo & 改个字体
              }
            </Row>
          </Link>
          <Divider type={"vertical"} style={{ height: "32px" }} />
          {
            globals.disableBreadcrumb ? null : <div className={cn("my-6")}>
              <Breadcrumb items={breadcrumbItems.map((l) => {
                return {
                  title: l
                }
              })} />
            </div>
          }
          <Row className={cn("flex-grow h-48 items-center")} justify={"end"}>
            {globals.disableDocs ? null :
              <Link href={"/docs"} wrapper innerFlex height={"48px"} wrapperStyle={{
                paddingRight: "12px",
              }}>
                <QuestionOutlined />
                Docs
              </Link>}
          </Row>
        </Row>
      </Header>
      <Layout>
        {
          globals.disableSider ? null : <Sider style={{
            background: colorBgContainer,
            borderRight: "1px solid #e8e8e8",
          }} theme={"light"} collapsible collapsed={collapsed} collapsedWidth={50}
            onCollapse={(value) => setCollapsed(value)}>
            <Menu theme="light" defaultSelectedKeys={[]} mode="inline" items={items} onSelect={({ keyPath }) => {
              console.log(keyPath);
              // setBreadcrumbItems(findTextByKeyPath(keyPath));
            }} />
          </Sider>
        }
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
