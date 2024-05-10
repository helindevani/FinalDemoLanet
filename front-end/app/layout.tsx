'use client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import {store,persistor} from "../store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <Layout>
        {children}
        </Layout>
        </PersistGate>
    </Provider>
        </body>
    </html>
  );
}
