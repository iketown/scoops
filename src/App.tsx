import Buckets from "components/Buckets";
import { AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import { useCallback, useState, useReducer } from "react";
import { getRandomOrder } from "utils/randomOrder";
import { HomeGrid } from "utils/HomeGrid";

import ConeDisplay from "./components/ConeDisplay";
import History from "./components/History";
import { gameReducer } from "redux/gameReducer";
import { conesReducer } from "redux/conesReducer";
import { incrementCones, addTip } from "redux/gameActions";

function App() {
  const [selectedConeId, setSelectedConeId] = useState<string>("");

  const [orders, setOrders] = useState<OrdersState>({
    cone_A: ["brown", "blue"],
    cone_B: ["green", "pink"],
    cone_C: ["blue", "white"],
  });

  const [newCones, conesDispatch] = useReducer(conesReducer, {
    cone_B: ["green__123"],
  });

  const [gameState, dispatch] = useReducer(gameReducer, {
    tips: 0,
    finishedCones: 0,
  });

  const handleAddScoop = useCallback(
    (flavor: Flavor) => {
      if (!selectedConeId) return;
      const id = nanoid(5);
      const flavorId = `${flavor}__${id}`;
      const action = {
        type: "ADD_SCOOP",
        payload: {
          flavorId,
          coneId: selectedConeId,
        },
      };
      conesDispatch(action);
    },
    [selectedConeId]
  );

  function handleSelectCone(coneId: string) {
    setSelectedConeId(coneId);
  }
  function handleRemoveScoop(coneId: string, index: number) {
    const action = {
      type: "REMOVE_SCOOP",
      payload: {
        coneId,
        index,
      },
    };
    conesDispatch(action);
  }
  function handleRemoveCone(coneId: string) {
    const action = {
      type: "REMOVE_CONE",
      payload: {
        coneId,
      },
    };
    conesDispatch(action);

    const newOrders = { ...orders };
    delete newOrders[coneId];
    setOrders(newOrders);
  }
  function handleAddCone() {
    const coneId = `cone__${nanoid(5)}`;
    const action = {
      type: "ADD_CONE",
      payload: {
        coneId,
      },
    };
    conesDispatch(action);
    const newOrder = getRandomOrder();
    setOrders((old) => ({ ...old, [coneId]: newOrder }));
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
                scoops={newCones[coneId]}
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
