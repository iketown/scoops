import { AnimatePresence, motion } from "framer-motion";
import { isConeCorrect } from "utils/isConeCorrect";
import React, { useEffect, useState } from "react";
import {
  ConeGrid,
  coneOffset,
  coneVariants,
  OrderGrid,
  scoopVariants,
  StyledCone,
  coneHeight,
  scoopHeight,
} from "utils/coneElements";

import { colors } from "constants/colors";
import CountdownTimer from "components/CountdownTimer";
import Scoop from "components/Scoop";

interface ConeDisplayI {
  coneId: string;
  selected?: boolean;
  scoops?: string[];
  order?: Flavor[];
  onClickCone?: () => void;
  onClickScoop?: (index: number) => void;
  onDone?: (tip: number) => void;
  tipCallback?: (tip: number) => void;
}

const ConeDisplay: React.FC<ConeDisplayI> = ({
  scoops = [],
  order = [],
  onClickCone = () => console.log("clicked cone"),
  onClickScoop = (index: number) => console.log("clicked flavor", index),
  selected,
  onDone = (tip: number) => console.log("success!", tip),
  coneId,
  tipCallback,
}) => {
  const [isDone, setIsDone] = useState(false);

  const orderString = order.join("-");

  useEffect(() => {
    let timeout: any;
    if (isConeCorrect(order, scoops)) {
      timeout = setTimeout(() => {
        setIsDone(true);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [isDone, onDone, order, scoops]);

  return (
    <ConeGrid
      layout
      layoutId={coneId}
      key={coneId}
      initial="initial"
      animate="in"
      exit="exit"
      variants={coneVariants}
      onClick={onClickCone}
      selected={selected}
    >
      <AnimatePresence>
        {scoops.map((flavorId, index) => {
          const [flavor] = flavorId.split("__");
          return (
            <motion.div
              variants={scoopVariants}
              key={flavorId}
              initial="initial"
              animate="in"
              exit="exit"
              transition={{ ease: "easeIn" }}
              // custom is distance from bottom of ConeGrid in px
              custom={coneHeight - coneOffset + scoopHeight * index + 1}
              style={{
                position: "absolute",
                left: "50%",
                translateX: "-50%",
                zIndex: 1,
              }}
            >
              <Scoop
                key={flavorId}
                flavor={flavor}
                onClick={() => onClickScoop(index)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
      <StyledCone key={orderString} />

      <OrderGrid key={`ordergrid-${orderString}`}>
        {order.map((flavor, index) => {
          return (
            <div
              style={{
                background: colors[flavor] || "grey",
                gridRow: 5 - index,
                border: "2px solid white",
                zIndex: 5,
              }}
              key={`${flavor}${index}${orderString}`}
            />
          );
        })}
      </OrderGrid>

      <CountdownTimer {...{ isDone, onDone, coneId, tipCallback }} />
    </ConeGrid>
  );
};

export default ConeDisplay;
