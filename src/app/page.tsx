'use client';
import 'tailwindcss/tailwind.css';
import React, {ReactNode} from 'react';
import { Button } from 'antd';
import { BookOutlined, RightOutlined } from '@ant-design/icons';

interface IntroCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

const IntroCard: React.FC<IntroCardProps> = ({ icon, title, description }) => {
  return (
    <div className="card flex items-center my-4 mx-8">
      <div className="card-icon m-2">
        {icon ?? <div className="card-icon-placeholder"></div>}
      </div>
      <div className="card-content m-2">
        <div className="card-title text-h4 font-bold text-black">{title}</div>
        <p className="card-description text-small text-gray-500">{description}</p>
      </div>
    </div>
  );
};


export default function Home() {

  const cardData = [
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "智海浪潮",
      description: "一款海洋环境预测商业化AI",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "智海浪潮",
      description: "一款海洋环境预测商业化AI",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "智海浪潮",
      description: "一款海洋环境预测商业化AI",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "智海浪潮",
      description: "一款海洋环境预测商业化AI",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "智海浪潮",
      description: "一款海洋环境预测商业化AI",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "智海浪潮",
      description: "一款海洋环境预测商业化AI",
    },

    // Add more card data as needed
  ];
  return (
    <main>
      <div className="h-screen">

        <div className="overflow-hidden h-screen bg-gray-400 flex items-center justify-center">
          <div className="text-center">
            <div className="font-bold text-h1 text-blue-900">智海浪潮</div>
            <div className="font-bold text-h3 text-blue-900">SciAI Ocean Anticipation Utils</div>
            <div className="text-large text-blue-900 mt-2">一款海洋环境预测商业化AI</div>

            <div className="flex flex-col items-center mt-4">
              <div className="flex items-center">
                <Button type="primary" shape="round" icon={<RightOutlined />} size={'large'} ghost={true} className="m-4">
                  前往使用
                </Button>
                <Button type="default" shape="round" icon={<BookOutlined />} size={'large'}  className="m-4">
                  使用文档
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden h-screen bg-white-600 flex items-center justify-center">
          <div className="text-center">
            <div className="font-bold text-5xl text-blue-900 mb-4">介绍</div>

            <div className="grid grid-cols-2 gap-4 m-2 mt-4">
              {cardData.map((card, index) => (
                <div key={index} className="mt-12 mb-12 ml-14 mr-14 p-4">
                  <IntroCard title={card.title} description={card.description} icon={
                    <img src={card.iconSrc} className="w-32 h-32" alt={card.title} />
                  } />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden h-screen bg-white-600 flex items-center justify-center">Section 3</div>
      </div>
    </main >

  )
}