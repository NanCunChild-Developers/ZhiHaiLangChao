import React from "react";
import NextLink from "next/link";
import "./Link.css";
const Link: React.FC<{
  href: string,
  children: React.ReactNode,
}> = ({href, children}) => {
  return <div className={"k-link"}>
    <NextLink href={href} style={{
      textDecoration: "none",
    }}>
      {children}
    </NextLink>
  </div>
};

export default Link;