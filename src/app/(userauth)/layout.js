import { Inter } from "next/font/google";
import "../globals.css";
import ProductContextProvider from "@/context/ProductContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Echo-Pellets",
  description: "Developed By Moon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductContextProvider>
          <div>
            {children}
          </div>
        </ProductContextProvider>
      </body>
    </html>
  );
}

