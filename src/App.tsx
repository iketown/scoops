import Buckets from "components/Buckets";
import { AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import styled from "styled-components";

import ConeDisplay from "./components/ConeDisplay";
import History from "./components/History";

const HomeGrid = styled.div`
  display: flex;
  margin: 2rem;
  overflow: scroll;
  max-width: 100vw;
  background-image: url(images/stripedBG.svg);
  background-size: 6rem;
`;

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

  const [tips, setTips] = useState<number>(21);
  const [finishedCones, setFinishedCones] = useState<number>(4);

  const handleAddScoop = useCallback(
    (flavor: Flavor) => {
      console.log("adding", flavor);
      if (!selectedConeId) return;
      const id = nanoid(5);
      const flavorId = `${flavor}__${id}`;
      // add flavorId to selected cone
    },
    [selectedConeId]
  );

  function handleSelectCone(coneId: string) {
    setSelectedConeId(coneId);
  }
  function handleRemoveScoop(coneId: string, index: number) {}
  function handleRemoveCone(coneId: string) {}
  function handleAddCone() {}
  function handleAddToHistory(tip: number) {}

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
      <History {...{ tips, finishedCones }} />
    </div>
  );
}

export default App;
