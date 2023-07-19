'use client'
import echarts from 'echarts';
import React, { useEffect } from 'react';
import { Divider, Row } from "antd";

const Page: React.FC = () => {
  
// 在组件的 useEffect 钩子中或页面的 componentDidMount 生命周期中执行
useEffect(() => {
  const chartContainer = document.getElementById('windFieldCC');
  // const chart = echarts.init(chartContainer);
  console.log(echarts); // 检查 echarts 对象是否已定义
  
  const options = {
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50],
      },
    ],
  };

  // chart.setOption(options);
}, []);


  return <div>
    <Row>
      <div style={{
        width: "47%",
        height: "600px",
        margin: "8px"
      }}>摸了 这里放数据图表把
        <div id="windFieldCC" style={{ width: '100%', height: '400px' }}>

        </div>

      </div>
      <Divider type={"vertical"} style={{
        height: "600px",
      }} /> 
      <div style={{
        width: "47%",
        height: "600px",
        margin: "8px"
      }}>摸了 这里放echart图表把
      </div>
    </Row>
  </div>
}
export default Page;