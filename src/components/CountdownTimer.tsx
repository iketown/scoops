import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { DoneBG, DoneButton } from "utils/coneElements";
const CountdownDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 5px;
  font-size: 1rem;
  display: flex;
  flex-direction: column-reverse;
`;

interface CountdownTimerI {
  isDone: boolean;
  onDone: (tip: number) => void;
  coneId: string;
  tipCallback?: (tip: number) => void;
}

const CountdownTimer: React.FC<CountdownTimerI> = ({
  isDone,
  onDone,
  coneId,
  tipCallback,
}) => {
  const [tip, setTip] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setTip((old) => Math.max(0, old - 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [setTip]);

  useEffect(() => {
    tipCallback && tipCallback(tip);
  }, [tip, tipCallback]);

  function handleRestart() {
    onDone(tip);
  }

  return (
    <>
      {isDone && (
        <DoneBG onClick={handleRestart}>
          <DoneButton>✓</DoneButton>
        </DoneBG>
      )}
      <CountdownDiv>
        <AnimatePresence>
          {Array.from({ length: tip }, (_, index) => (
            <motion.div
              custom={index}
              variants={coinVariants}
              initial="initial"
              animate="in"
              exit="exit"
              key={`${coneId}-${index}`}
            >
              🪙
            </motion.div>
          ))}
        </AnimatePresence>
      </CountdownDiv>
    </>
  );
};

export default CountdownTimer;

const coinVariants: Variants = {
  in: (index) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: index * 0.05 },
  }),
  initial: { scale: 0 },
  exit: { opacity: 0, scale: 0, transition: { duration: 1 } },
};
