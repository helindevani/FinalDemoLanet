import Provider from "@/store/Provider";
import "./globals.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "RefillSmart",
  description:
    "RefillSmart: RefillSmart Is Provide Quick Booking Facilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
      <Provider>
        {children}
      </Provider>
        </body>
    </html>
  );
}
