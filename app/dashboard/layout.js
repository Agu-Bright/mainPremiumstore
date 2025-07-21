import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@components/Provider";
import FilterContextProvider from "@context/FilterContext";
import RestaurantContextProvider from "@context/RestaurantContext";
import LiveChatScript from "@components/LiveChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ActiveStore",
  description: "Comsscore",
};

export default function RootLayout({ children }) {
  return (
    <div className={inter.className}>
      <Provider>
        <RestaurantContextProvider>
          <FilterContextProvider>{children}</FilterContextProvider>
        </RestaurantContextProvider>
        {/* <LiveChatScript /> */}
      </Provider>
      {/* <noscript>
          <a href="https://www.livechat.com/chat-with/18231096/" rel="nofollow">
            Chat with us
          </a>
          , powered by{" "}
          <a
            href="https://www.livechat.com/?welcome"
            rel="noopener nofollow"
            target="_blank"
          >
            LiveChat
          </a>
        </noscript> */}
    </div>
  );
}
