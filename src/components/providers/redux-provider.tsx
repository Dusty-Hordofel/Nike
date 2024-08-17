"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
// import { store } from "./index";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// persistStore(store);
const persistor = persistStore(store);
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
