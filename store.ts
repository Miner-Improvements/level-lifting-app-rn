import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import bluetoothModalShownReducer from "./reducers/bluetoothModalShownReducer";
import themeReducer from "./reducers/themeReducer";
import workoutsReducer from "./reducers/workoutsReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["bluetoothModalShown"],
};

const rootReducer = combineReducers({
  workouts: workoutsReducer,
  theme: themeReducer,
  bluetoothModalShown: bluetoothModalShownReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
