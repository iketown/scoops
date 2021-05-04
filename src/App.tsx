import Buckets from "components/Buckets";
import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "redux/hooks";
import { HomeGrid } from "utils/HomeGrid";

import ConeDisplayRx from "./components/ConeDisplayRX";
import History from "./components/History";
import isEqual from "lodash.isequal";

function App() {
  const orderKeys = useAppSelector(
    ({ orders }) => Object.keys(orders),
    isEqual
  );

  return (
    <div onKeyPress={(hey) => console.log("hey", hey)}>
      <HomeGrid>
        <AnimatePresence>
          {orderKeys.map((coneId) => {
            return <ConeDisplayRx key={coneId} coneId={coneId} />;
          })}
        </AnimatePresence>
      </HomeGrid>

      <Buckets />
      <History />
    </div>
  );
}

export default App;
