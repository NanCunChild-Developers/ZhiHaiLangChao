import React from "react";

const Layout : React.FC<{
  children: React.ReactNode,
}> = ({children})=>{
  return <main>
    {children}
  </main>
}

export default Layout;