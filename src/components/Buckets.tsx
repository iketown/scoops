import styled from "styled-components";
import { colors } from "../constants/colors";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch, AppDispatch } from "redux/hooks";
import { addScoop } from "redux/gameActions";
import { memo } from "react";
import { RootState } from "redux/store";
const BucketsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem auto;
  height: 200px;
  max-width: 800px;
`;

export const Buckets: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAddScoop = (flavor: Flavor) => {
    const thunk = async (dispatch: AppDispatch, getState: () => RootState) => {
      const {
        game: { selectedConeId },
      } = getState();
      if (!selectedConeId) return;
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
      const action = addScoop({ flavor, coneId: selectedConeId });
      dispatch(action);
    };
    dispatch(thunk);
  };

  return (
    <BucketsDiv>
      {Object.entries(colors).map(([flavor, color]) => {
        return (
          <motion.div
            whileHover={"hovered"}
            animate="idle"
            variants={{
              hovered: { scale: 1.05 },
              idle: { scale: 0.95 },
            }}
            key={flavor}
            onClick={() => {
              handleAddScoop(flavor as Flavor);
            }}
            style={{
              backgroundImage: `url(images/bucket_${flavor}.jpg)`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: "300px",
              width: "300px",
              position: "relative",
              cursor: "pointer",
            }}
          ></motion.div>
        );
      })}
    </BucketsDiv>
  );
};

export default memo(Buckets);
