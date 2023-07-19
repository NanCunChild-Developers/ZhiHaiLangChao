'use client'
import React from 'react';
import {Divider, Row} from "antd";

const Page: React.FC = () => {
  return <div>
    <Row>
      <div style={{
        width: "47%",
        height: "600px",
        margin: "8px"
      }}>摸了 这里放数据图表把
      </div>
      <Divider type={"vertical"} style={{
        height: "600px",
      }}/>
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