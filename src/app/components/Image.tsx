import React from "react";
import NextImage from "next/image";

const Image: React.FC<{
  src: string,
  height?: number,
  width?: number,
  className?: string,
  style?: React.CSSProperties,
  alt?: string,
  useNextImage?: boolean,
}> = ({src, height, width, className, style, alt, useNextImage = false}) => {
  return useNextImage ? <NextImage src={src} height={height} width={width} className={className} style={{
    height: `${height}px`,
    width: `${width}px`,
    ...style,
    // eslint-disable-next-line @next/next/no-img-element
  }} alt={alt ?? ""}/> : <img src={src} height={height} width={width} className={className} style={{
    height: `${height}px`,
    width: `${width}px`,
    ...style,
  }} alt={alt ?? ""}/>;
}

export default Image;