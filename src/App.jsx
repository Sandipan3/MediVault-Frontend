import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { store, persistor } from "./store/store";
import router from "./router/router";
import BlueSpinner from "./components/BlueSpinner"; // Must be a synchronous import

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<BlueSpinner />}>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
