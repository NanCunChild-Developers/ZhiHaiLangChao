'use client'
import React from "react";
import {cn} from "@/utils/utils";
import EChartsReact from "echarts-for-react";

const ChartBase : React.FC<{
  label?: string,
  options?: any,
}> = ({label,options}) => {
  return <div className={cn("")}>
    <div className={cn("flex flex-grow justify-between items-center font text-2xl mt-4 ml-4")}>{label}</div>
    <EChartsReact option={options} style={{width: '100%', height: '620px'}}/>
  </div>
}

export default ChartBase;