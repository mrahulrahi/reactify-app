import { Provider } from "react-redux";
import { makeStore } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = makeStore();

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default Providers;