import ConeDisplay from "./ConeDisplay";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  addCone,
  addTip,
  incrementCones,
  removeCone,
  removeScoop,
  setSelectedCone,
} from "redux/gameActions";

const ConeDisplayRX: React.FC<{ coneId: string }> = ({ coneId }) => {
  const isSelected = useAppSelector(
    ({ game }) => game.selectedConeId === coneId
  );
  const scoops = useAppSelector(({ cones }) => cones[coneId]);
  const order = useAppSelector(({ orders }) => orders[coneId]);
  const dispatch = useAppDispatch();

  const handleSelectCone = () => {
    dispatch(setSelectedCone(coneId));
  };
  const handleRemoveScoop = (index: number) => {
    dispatch(removeScoop({ coneId, index }));
  };
  const handleFinishCone = (tip: number) => {
    dispatch(incrementCones());
    dispatch(addTip(tip));
    dispatch(removeCone(coneId));
    dispatch(addCone());
  };

  return (
    <ConeDisplay
      key={coneId}
      coneId={coneId}
      selected={isSelected}
      scoops={scoops}
      order={order}
      onClickCone={handleSelectCone}
      onClickScoop={handleRemoveScoop}
      onDone={handleFinishCone}
    />
  );
};

export default ConeDisplayRX;
