import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";

// const reducers = combineReducers({ cart: cartReducer });

// const config = {
//   key: "root",
//   storage,
// };

// const reducer = persistReducer(config, reducers);

// export const store = configureStore({
//   reducer: reducer,
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

export const store = configureStore({
  reducer: {
    // themeState: themeReducer,
    cart: cartReducer,
    // userState: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
