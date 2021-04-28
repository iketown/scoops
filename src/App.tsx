import Buckets from "components/Buckets";
import { AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { getRandomOrder } from "utils/randomOrder";
import { HomeGrid } from "utils/HomeGrid";

import ConeDisplay from "./components/ConeDisplay";
import History from "./components/History";
import { gameReducer } from "redux/gameReducer";

function App() {
  const [selectedConeId, setSelectedConeId] = useState<string>("");

  const [orders, setOrders] = useState<OrdersState>({
    cone_A: ["brown", "blue"],
    cone_B: ["green", "pink"],
    cone_C: ["blue", "white"],
  });

  const [cones, setCones] = useState<ConesState>({
    cone_B: ["green__123"],
  });

  const [gameState, setGameState] = useState({
    tips: 0,
    finishedCones: 0,
  });

  const handleAddScoop = useCallback(
    (flavor: Flavor) => {
      console.log("adding", flavor);
      if (!selectedConeId) return;
      const id = nanoid(5);
      const flavorId = `${flavor}__${id}`;
      // add flavorId to selected cone
      const oldCone = cones[selectedConeId] || [];
      const newCones = { ...cones, [selectedConeId]: [...oldCone, flavorId] };
      setCones(newCones);
    },
    [cones, selectedConeId]
  );

  function handleSelectCone(coneId: string) {
    setSelectedConeId(coneId);
  }
  function handleRemoveScoop(coneId: string, index: number) {
    const oldCone = cones[coneId] || [];
    const newCone = [...oldCone.slice(0, index), ...oldCone.slice(index + 1)];
    setCones((oldCones) => ({ ...oldCones, [coneId]: newCone }));
  }
  function handleRemoveCone(coneId: string) {
    const newCones = { ...cones };
    delete newCones[coneId];
    setCones(newCones);

    const newOrders = { ...orders };
    delete newOrders[coneId];
    setOrders(newOrders);
  }
  function handleAddCone() {
    const coneId = `cone__${nanoid(5)}`;
    const newOrder = getRandomOrder();
    setOrders((old) => ({ ...old, [coneId]: newOrder }));
  }

  function handleAddToHistory(tip: number) {
    const coneAction = {
      type: "INCREMENT_CONES",
    };
    setGameState((oldState) => gameReducer(oldState, coneAction));
    const tipAction = {
      type: "ADD_TIP",
      payload: {
        tip,
      },
    };
    setGameState((oldState) => gameReducer(oldState, tipAction));
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
