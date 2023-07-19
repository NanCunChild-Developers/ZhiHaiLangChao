import React from "react";
import NextLink from "next/link";

const Link: React.FC<{
  href: string,
  children: React.ReactNode,
  wrapper?: boolean,
  style?: React.CSSProperties,
  wrapperStyle?: React.CSSProperties,
  className?: string,
  innerFlex?: boolean,
  height?: string,
}> = (
  {
    href,
    children,
    wrapper = false,
    style,
    wrapperStyle,
    className,
    innerFlex,
    height,
  }) => {
  const inner = innerFlex ? <div className={"flex flex-row items-center justify-center"} style={{
    height: height,
  }}>{children}</div> : children;
  const link = <NextLink href={href} style={{
    textDecoration: "none",
    height: height,
    ...style,
  }} className={className} prefetch={true} replace={false}>
    {inner}
  </NextLink>;
  return wrapper ? <div className={"text-black hover:text-blue-500"} style={{
    cursor: "pointer",
    height: height,
    ...wrapperStyle,
  }}>{link}</div> : link;
};

export default Link;