import styled from "styled-components";
import { motion, Variants } from "framer-motion";

export const ConeGrid = styled(motion.div)<{ selected?: boolean }>`
  flex-shrink: 0;
  position: relative;
  height: 650px;
  width: 190px;
  transition: background 0.5s;
  border: 3px solid #ffffff;
  ${(p) =>
    p.selected
      ? `
  background: #ffffffb3;
    box-shadow: 0px 0px 20px 8px #ffffff78;
    border: 3px solid hotpink;
    border-radius: 1rem;
  `
      : ``}
`;

export const coneHeight = 310;
export const coneOffset = 100;
export const scoopHeight = 70;

export const StyledCone = styled.div`
  width: 150px;
  height: ${coneHeight}px;
  background-image: url(/images/coneimg.png);
  background-size: cover;
  z-index: 0;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
export const DoneBG = styled.div`
  background: #ffffffbb;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const DoneButton = styled.button`
  padding: 3px;
  border: 2px solid white;
  background: green;
  font-size: 2rem;
  color: white;
  border-radius: 1rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

export const OrderGrid = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: 50px;
  grid-template-rows: repeat(5, 20px);
  position: absolute;
  bottom: 5rem;
  left: 2rem;
  z-index: 5;
`;

export const scoopVariants: Variants = {
  in: (bottom: number) => ({
    bottom: `${bottom}px`,
    y: 0,
    opacity: 1,
  }),
  initial: { y: -150, opacity: 0 },
  exit: { y: 500, opacity: 0, transition: { duration: 0.5 } },
};

export const coneVariants: Variants = {
  in: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  initial: { scale: 0.5, opacity: 0, y: -200 },
  exit: { scale: 1, opacity: 0, y: 200, transition: { duration: 0.5 } },
};

export const fakeRecord = [
  { tip: 10, scoops: 2 },
  { tip: 2, scoops: 4 },
  { tip: 12, scoops: 1 },
];
