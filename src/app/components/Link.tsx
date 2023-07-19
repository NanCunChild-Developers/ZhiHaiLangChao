import React from "react";
import NextLink from "next/link";
import "./Link.css";

const Link: React.FC<{
  href: string,
  children: React.ReactNode,
  wrapper?: boolean,
}> = ({href, children, wrapper = true}) => {
  return wrapper ? <div className={"k-link"}>
    <NextLink href={href} style={{
      textDecoration: "none",
    }}>
      {children}
    </NextLink>
  </div> : <NextLink href={href} style={{
    textDecoration: "none",
  }}>
    {children}
  </NextLink>;
};

export default Link;