import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import covid19JapanReducer from "../features/covid19Japan/covid19JapanSlice";
import covid19WorldReducer from "../features/covid19World/covid19WorldSlice";

export const store = configureStore({
  reducer: {
    covid19Japan: covid19JapanReducer,
    covid19World: covid19WorldReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
