import React from "react";

interface SvgElementProps {
  svg: string;
  size: number | string;
  className?: string;
  onClick: Function;
  type?: string;
}

const SvgElement = (props: SvgElementProps) => {
  const { svg, size = 24, className, onClick, type } = props;
  const svgSize = typeof size === "number" ? `${size}px` : size;
  return (
    <img
      className={`inline-block ${className}`}
      style={{ width: svgSize, height: svgSize }}
      src={svg}
      onClick={(e) => onClick(type)}
    />
  );
};

export default SvgElement;
