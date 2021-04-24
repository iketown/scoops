import styled from "styled-components";
import { colors } from "../constants/colors";
import { motion } from "framer-motion";

const BucketsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem auto;
  height: 200px;
  max-width: 800px;
`;

interface BucketsI {
  onAddScoop: (flavor: Flavor) => void;
}

export const Buckets: React.FC<BucketsI> = ({ onAddScoop }) => {
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
            onClick={() => onAddScoop(flavor as Flavor)}
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

export default Buckets;
