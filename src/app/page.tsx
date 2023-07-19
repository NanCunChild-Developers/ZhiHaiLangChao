'use client';
import 'tailwindcss/tailwind.css';
import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { BookOutlined, RightOutlined } from '@ant-design/icons';
import { cn } from "@/utils/utils";
import { WechatOutlined, WeiboOutlined, QqOutlined, TwitterOutlined } from '@ant-design/icons';
import Link from "@/app/components/Link";
import {globals} from "@/globals";
import Image from "@/app/components/Image";

interface IntroCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

const IntroCard: React.FC<IntroCardProps> = ({ icon, title, description }) => {
  return (
    <div className={cn("card flex items-center justify-center my-16 ")}>
      <div className={cn("card-icon mx-8")}>
        {icon ?? <div className={cn("card-icon-placeholder")}></div>}
      </div>
      <div className={cn("card-content m-2 max-w-half text-left")}>
        <div className={cn("card-title text-2xl font-bold text-black")}>{title}</div>
        <p className={cn("card-description text-sm text-gray-500 m-2")}>{description}</p>
      </div>
    </div>
  );
};


export default function Home() {
  const cardData = [
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "强大的AI基础",
      description: "我们的项目基于先进的深度学习和卷积算法，具备强大的人工智能能力。通过使用这些算法，我们能够准确地生成和预测海洋面的运动。",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "准确的预测能力",
      description: "通过分析历史数据和应用机器学习技术，我们的项目能够准确地预测海洋运动。这有助于海洋相关行业做出明智的决策和规划。",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "网页部署",
      description: "我们的项目在网页上进行部署，使用户能够方便快捷地访问和管理海洋面生成与预测软件。用户可以通过浏览器随时随地查看和操作，无需安装额外的软件。",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "可视化展示",
      description: "我们的项目提供直观的可视化展示界面，通过图表、图像和动画等形式，直观地呈现海洋运动的预测结果。这使用户能够更好地理解和分析海洋数据。",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "数据管理和分析",
      description: "除了预测功能，我们的项目还提供数据管理和分析的能力。用户可以对海洋数据进行存储、查询和分析，从而更好地了解海洋环境并做出相关决策。",
    },
    {
      iconSrc: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      title: "高效便捷",
      description: "我们的项目旨在为用户提供高效和便捷的使用体验。通过优化算法和界面设计，我们努力实现快速的数据处理和操作，让用户能够高效地进行海洋面生成和预测。",
    },

    // Add more card data as needed
  ];

  const contactCardData = [
    {
      title: "Wechat",
      icon: <WechatOutlined />,
      description: "WeiXinID:123",
    },
    {
      title: "QQ",
      icon: <QqOutlined />,
      description: "QQ:123",
    },
    {
      title: "Weibo",
      icon: <WeiboOutlined />,
      description: "@Zhihailangchao",
    },
    {
      title: "Twitter",
      icon: <TwitterOutlined />,
      description: "@Zhihailangchao",
    },
  ];

  return (
    <main>
      <div className={cn("h-screen")}>
        <div className={cn("overflow-hidden h-screen flex justify-center")}>
        {
            globals.enableTitleScreenBackground ? <div className={"title-screen animate-bgBlur"}/> : null
          }
          <div className={cn("text-center mt-[30vh]")}>
            <div className={cn("font-bold text-7xl text-blue-900 animate-titleFloat")}>智海浪潮</div>
            <div className={cn("font-bold text-3xl text-blue-900 animate-titleFloat")}>SciAI Ocean Anticipation Utils</div>
            <div className={cn("text-lg text-blue-900 mt-2 animate-titleFloat")}>一款海洋环境预测商业化AI</div>
            <div className={cn("flex flex-col items-center mt-4")}>
              <div className={cn("flex items-center")}>
                <Link href={globals.disableSider ? "/operation/analyze" : "/operation"}>
                  <Button type="primary" shape="round" icon={<RightOutlined/>} size={'large'} ghost={true}
                          className={cn("m-4")}>
                    前往使用
                  </Button>
                </Link>
                {
                  globals.disableDocs ? null : <Link href={"/docs"}>
                    <Button type="default" shape="round" icon={<BookOutlined/>} size={'large'} className={cn("m-4")}>
                      使用文档
                    </Button>
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
        <div className={cn("overflow-hidden h-screen bg-white-600 flex items-center justify-center")}>
          <div className={cn("text-center")}>
            <div className={cn("font-bold text-4xl text-blue-900 mb-4")}>介绍</div>

            <div className={cn("grid grid-cols-2 gap-4 m-2 mt-4 justify-center items-center")}>
              {cardData.map((card, index) => (
                <div key={index} className={cn("mt-8 mb-8 ml-2 mr-2 p-6 ")}>
                  <IntroCard
                    title={card.title}
                    description={card.description}
                    icon={<Image src={card.iconSrc} height={32} width={32} alt={card.title} />}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={cn("overflow-hidden h-screen bg-white-600 flex items-center justify-center")}>
          <div className={cn("text-center")}>
            <h2 className={cn("font-bold text-4xl text-blue-900 mb-4")}>订阅关注</h2>

            <div className={cn("grid grid-cols-4 gap-64 mt-32")}>
              {contactCardData.map((card, index) => (
                <div key={index} className={cn("flex flex-col items-center")}>
                  <IntroCard title={card.title} icon={card.icon} description={card.description} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>

  )
}