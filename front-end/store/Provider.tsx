"use client";

import { Provider } from "react-redux";
import { persistor, store } from ".";
import Layout from "@/components/Layout/Layout";
import { PersistGate } from "redux-persist/integration/react";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <Layout>
        {children}
        </Layout>
        </PersistGate>
    </Provider>
  );
};

export default Providers;