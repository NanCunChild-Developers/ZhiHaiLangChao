'use client'
import React, { useEffect } from 'react';
import echarts from 'echarts';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const ChartTabs = () => {
  const handleTabChange = (key: any) => {
    // 根据切换的Tab key来更新图表数据或执行其他操作
    console.log('Tab changed:', key);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      <TabPane tab="图表1" key="1">
        {/* 图表1的内容 */}
        111
      </TabPane>
      <TabPane tab="图表2" key="2">
        {/* 图表2的内容 */}
        222
      </TabPane>
      <TabPane tab="图表3" key="3">
        {/* 图表3的内容 */}
        333
      </TabPane>
    </Tabs> 
  );
};



const Page: React.FC = () => {
  // useEffect(() => {
  //   // 获取容器元素
  //   const chartContainer = document.getElementById('chartContainer');
  //   // 创建图表实例
  //   const chart = echarts.init(chartContainer);
  
  //   // 配置图表数据和样式
  //   const options = {
  //     // 图表配置选项
  //     // ...
  //   };
  
  //   // 设置图表配置
  //   chart.setOption(options);
  
  //   // 清除图表实例
  //   return () => {
  //     chart.dispose();
  //   };
  // }, []);

  
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
      <div id='echartsContainer' style={{ width: '100%', height: '400px' }}></div>

      soso
    </div>
  </div>

}
export default Page;