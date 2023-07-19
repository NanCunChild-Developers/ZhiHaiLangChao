'use client';
import React, {ReactNode} from 'react';
import {Button} from 'antd';
import {BookOutlined, RightOutlined} from '@ant-design/icons';
import {cn} from "@/utils/utils";
import Link from "@/app/components/Link";
import {globals} from "@/globals";

interface IntroCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

const IntroCard: React.FC<IntroCardProps> = ({icon, title, description}) => {
  return (
    <div className={cn("card flex items-center my-4 mx-8")}>
      <div className={cn("card-icon m-2")}>
        {icon ?? <div className={cn("card-icon-placeholder")}></div>}
      </div>
      <div className={cn("card-content m-2")}>
        <div className={cn("card-title text-2xl font-bold text-black")}>{title}</div>
        <p className={cn("card-description text-sm text-gray-500")}>{description}</p>
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
      <div className={cn("h-screen")}>
        <div className={cn("overflow-hidden h-screen flex justify-center")}>
          <div className={"title-screen"}/>
          <div className={cn("text-center mt-[30vh]")}>
            <div className={cn("font-bold text-4xl text-blue-900")}>智海浪潮</div>
            <div className={cn("font-bold text-2xl text-blue-900")}>SciAI Ocean Anticipation Utils</div>
            <div className={cn("text-lg text-blue-900 mt-2")}>一款海洋环境预测商业化AI</div>
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

            <div className={cn("grid grid-cols-2 gap-4 m-2 mt-4")}>
              {cardData.map((card, index) => (
                <div key={index} className={cn("mt-12 mb-12 ml-14 mr-14 p-4")}>
                  <IntroCard title={card.title} description={card.description} icon={
                    <img src={card.iconSrc} className={cn("w-32 h-32")} alt={card.title}/>
                  }/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={cn("overflow-hidden h-screen bg-white-600 flex items-center justify-center")}>Section 3</div>
      </div>
    </main>

  )
}