import { combineReducers } from "redux";
import user from "./user";
import storage from "redux-persist/lib/storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import logger from 'redux-logger'

// Todo: redux-persist에 유지할 내용 수정 예정
const persistConfig = {
  key: "root",
  storage,
    // Todo: whitelist 수정
    // whitelist: ["user"] : user storage만 유지
  whitelist: [],
};

const rootReducer = combineReducers({
  user,
});

const PersistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: PersistedReducer,
  // devTools:
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

const persistor = persistStore(store);
const action = (type, payload) => store.dispatch({ type, payload })

export {store, persistor, action}