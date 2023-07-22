'use client'
import React from 'react';
import { Tabs } from 'antd';
import {LinerChart} from "@/app/operation/analyze/nav1/charts/Examples";

const { TabPane } = Tabs;

const ChartTabs = () => {
  const handleTabChange = (key: any) => {
    // 根据切换的Tab key来更新图表数据或执行其他操作
    console.log('Tab changed:', key);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      <TabPane tab="图表1" key="1">
        <LinerChart />
      </TabPane>
      <TabPane tab="图表2" key="2">
        <LinerChart />
      </TabPane>
      <TabPane tab="图表3" key="3">
        <LinerChart />
      </TabPane>
    </Tabs> 
  );
};

const Page: React.FC = () => {
  return <div className="w-full h-screen flex justify-center">
    <div className="w-1/2 h-600px m-8">
      <div className="mb-4">
        <h2 className="font-bold text-xl">风场数据</h2>
      </div>
      <div className="space-y-4">
        <div>
          <p className="font-semibold">风场散度:</p>
          <p>数据内容</p>
        </div>
        <div>
          <p className="font-semibold">平均风速:</p>
          <p>数据内容</p>
        </div>
        <div>
          <p className="font-semibold">最大风速:</p>
          <p>数据内容</p>
        </div>
        <div>
          <p className="font-semibold">平均风温:</p>
          <p>数据内容</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-xl">洋面数据</h2>
      </div>
      <div className="space-y-4">
        <div>
          <p className="font-semibold">洋流散度:</p>
          <p>数据内容</p>
        </div>
        <div>
          <p className="font-semibold">平均温度:</p>
          <p>数据内容</p>
        </div>
      </div>
    </div>


    <div className="w-1/2 h-600px m-8">
      {/* Echarts放这里 */}
      <ChartTabs />
    </div>
  </div>

}
export default Page;