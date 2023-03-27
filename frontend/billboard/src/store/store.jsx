import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

import user from "./user";

// Todo: redux-persist에 유지할 내용 수정 예정
const persistConfig = {
  key: "root",
  storage,
  // Todo: whitelist 수정
  // whitelist: ["user"] : user storage만 유지
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user,
});

const PersistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: PersistedReducer,
  // devTools:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

const persistor = persistStore(store);
const action = (type, payload) => store.dispatch({ type, payload });

export { store, persistor, action };
