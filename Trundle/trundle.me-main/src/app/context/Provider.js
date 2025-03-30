"use client";

import { Provider } from "react-redux";
import { makeStore } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";

const { store, persistor } = makeStore();

export function Providers({ children }) {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <SessionProvider>{children}</SessionProvider>
         </PersistGate>
      </Provider>
   );
}

export default Providers;
