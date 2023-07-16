'use client'

import React from "react";
import Markdown from "@/app/components/Markdown";

const Page: React.FC<{}> = ()=>{
  return <Markdown href={"/docs/page.md"}/>
};

export default Page;