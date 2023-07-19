'use client'
import React, {useContext} from 'react';
import {Upload} from "antd";
import {AnalyzeContext} from "@/app/operation/analyze/context";
import {cn} from "@/utils/utils";

const Page: React.FC = () => {
  const context = useContext(AnalyzeContext);
  return <div className={cn("flex flex-col gap-16 items-center justify-center")}>
    <div>
      {context.current?.value ?? "no files"}
    </div>
    <Upload>
      <div className={cn("w-fit h-fit p-12 border-2 flex items-center justify-center")}>
        点击或拖拽文件到此处上传
      </div>
    </Upload>
  </div>
}
export default Page;