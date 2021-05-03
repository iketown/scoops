import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { useAppSelector } from "redux/hooks";
const StyledHistoryDiv = styled.div`
  position: fixed;
  border: 3px solid pink;
  background: white;
  padding: 1rem;
  border-radius: 2rem;
  color: grey;
  top: 1rem;
  left: 10%;
  right: 10%;
  display: flex;
  justify-content: space-between;
  font-family: sans-serif;
  .tips,
  .finished {
    font-size: 20px;
    font-weight: bold;
    line-height: 0.9;
    color: darkgreen;
  }
`;

const History: React.FC = () => {
  const { tips, finishedCones } = useAppSelector(({ game }) => game);

  return (
    <StyledHistoryDiv>
      <div style={{ position: "relative" }}>
        TIPS:{" "}
        <motion.span
          initial="initial"
          animate="in"
          key={tips}
          variants={numVariants}
          className="tips"
          style={{
            position: "absolute",
            marginLeft: "4px",
          }}
        >
          {tips}
        </motion.span>
      </div>
      <div style={{ position: "relative", left: "-1rem" }}>
        CONES:{" "}
        <motion.span
          initial="initial"
          animate="in"
          key={finishedCones}
          variants={numVariants}
          className="finished"
          style={{
            position: "absolute",
            marginLeft: "4px",
          }}
        >
          {finishedCones}
        </motion.span>
      </div>
    </StyledHistoryDiv>
  );
};

export default History;

const numVariants: Variants = {
  initial: { y: -50, opacity: 0 },
  in: { y: 0, opacity: 1 },
};
