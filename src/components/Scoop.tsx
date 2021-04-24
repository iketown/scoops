import React from "react";
import * as scoopImg from "./Scoops";

const Scoops: {
  [key: string]: React.FC<{ width: string; onClick: any; cursor: any }>;
} = {
  brown: scoopImg.Choc,
  white: scoopImg.Van,
  blue: scoopImg.Blue,
  green: scoopImg.Green,
  pink: scoopImg.Straw,
};

const Scoop: React.FC<{ flavor: Flavor | string; onClick: any }> = ({
  flavor,
  onClick,
}) => {
  const ColoredScoop = Scoops[flavor];
  if (!ColoredScoop) return <b style={{ color: "red" }}>no scoop! {flavor}</b>;
  return <ColoredScoop width="10rem" onClick={onClick} cursor="pointer" />;
};

export default Scoop;
