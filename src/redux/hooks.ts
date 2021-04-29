import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { RootState, store } from "redux/store";

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
