import Buckets from "components/Buckets";
import { AnimatePresence } from "framer-motion";
import {
  addCone,
  addTip,
  incrementCones,
  removeCone,
  removeScoop,
} from "redux/gameActions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { HomeGrid } from "utils/HomeGrid";

import ConeDisplay from "./components/ConeDisplay";
import History from "./components/History";

function App() {
  const dispatch = useAppDispatch();
  const cones = useAppSelector(({ cones }) => cones);
  const orders = useAppSelector(({ orders }) => orders);
  const selectedConeId = useAppSelector(({ game }) => game.selectedConeId);

  function handleSelectCone(coneId: string) {
    // setSelectedConeId(coneId);
    const action = {
      type: "SET_SELECTED_CONE",
      payload: {
        coneId,
      },
    };
    dispatch(action);
  }
  function handleRemoveScoop(coneId: string, index: number) {
    const action = removeScoop({ coneId, index });
    dispatch(action);
  }
  function handleRemoveCone(coneId: string) {
    const action = removeCone(coneId);
    dispatch(action);
  }
  function handleAddCone() {
    const action = addCone();
    dispatch(action);
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

      <Buckets />
      <History />
    </div>
  );
}

export default App;
