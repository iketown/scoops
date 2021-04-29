import Buckets from "components/Buckets";
import { AnimatePresence } from "framer-motion";
import { useCallback, useState, useReducer } from "react";
import { HomeGrid } from "utils/HomeGrid";

import ConeDisplay from "./components/ConeDisplay";
import History from "./components/History";
import { gameReducer } from "redux/gameReducer";
import { conesReducer } from "redux/conesReducer";
import { ordersReducer } from "redux/ordersReducer";
import {
  incrementCones,
  addTip,
  removeScoop,
  removeCone,
  addScoop,
  addCone,
} from "redux/gameActions";

function App() {
  const [selectedConeId, setSelectedConeId] = useState<string>("");

  const [cones, conesDispatch] = useReducer(conesReducer, {
    cone_B: ["green__123"],
  });
  const [orders, ordersDispatch] = useReducer(ordersReducer, {
    cone_A: ["brown", "blue"],
    cone_B: ["green", "pink"],
    cone_C: ["blue", "white"],
  });

  const [gameState, dispatch] = useReducer(gameReducer, {
    tips: 0,
    finishedCones: 0,
  });

  const handleAddScoop = useCallback(
    (flavor: Flavor) => {
      if (!selectedConeId) return;
      const action = addScoop({ flavor, coneId: selectedConeId });
      conesDispatch(action);
    },
    [selectedConeId]
  );

  function handleSelectCone(coneId: string) {
    setSelectedConeId(coneId);
  }
  function handleRemoveScoop(coneId: string, index: number) {
    const action = removeScoop({ coneId, index });
    conesDispatch(action);
  }
  function handleRemoveCone(coneId: string) {
    const action = removeCone(coneId);
    conesDispatch(action);
    ordersDispatch(action);
  }
  function handleAddCone() {
    const action = addCone();
    conesDispatch(action);
    ordersDispatch(action);
  }

  function handleAddToHistory(tip: number) {
    const coneAction = incrementCones();
    dispatch(coneAction);
    const tipAction = addTip(tip);
    dispatch(tipAction);
  }

  function handleFinishCone(coneId: string, tip: number) {
    handleAddToHistory(tip);
    handleRemoveCone(coneId);
    // this may become part of the game mechanics later
    // adding more cones as score gets higher, etc.
    // for now we'll just add one every time you remove one.
    handleAddCone();
  }

  return (
    <div onKeyPress={(hey) => console.log("hey", hey)}>
      <HomeGrid>
        <AnimatePresence>
          {Object.keys(orders).map((coneId) => {
            const isSelected = coneId === selectedConeId;
            return (
              <ConeDisplay
                key={coneId}
                coneId={coneId}
                selected={isSelected}
                scoops={cones[coneId]}
                order={orders[coneId]}
                onClickCone={() => handleSelectCone(coneId)}
                onClickScoop={(index) => handleRemoveScoop(coneId, index)}
                onDone={(tip: number) => handleFinishCone(coneId, tip)}
              />
            );
          })}
        </AnimatePresence>
      </HomeGrid>

      <Buckets onAddScoop={handleAddScoop} />
      <History {...gameState} />
    </div>
  );
}

export default App;
