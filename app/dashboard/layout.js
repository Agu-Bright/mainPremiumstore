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
    <html lang="en">
      <head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__lc = window.__lc || {};
              window.__lc.license = 18231096;
              window.__lc.integration_name = "manual_channels";
              window.__lc.product_name = "livechat";
              (function(n,t,c){
                function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}
                var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){
                  var n=t.createElement("script");
                  n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)
                }};
                !n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e
              }(window,document,[].slice));
            `,
          }}
        /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />

        {/* <!-- External CSS libraries --> */}
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/animate.min.css" />

        <link
          rel="stylesheet"
          type="text/css"
          href="/css/bootstrap-submenu.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/css/bootstrap-select.min.css"
        />
        <link rel="stylesheet" type="text/css" href="/css/magnific-popup.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="/css/daterangepicker.css"
        />
        <link rel="stylesheet" href="css/leaflet.css" type="text/css" />
        <link rel="stylesheet" href="css/map.css" type="text/css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="/fonts/font-awesome/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/fonts/flaticon/font/flaticon.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/fonts/linearicons/style.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/css/jquery.mCustomScrollbar.css"
        />
        <link rel="stylesheet" type="text/css" href="css/dropzone.css" />
        <link rel="stylesheet" type="text/css" href="css/slick.css" />

        {/* <!-- Custom stylesheet --> */}
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link
          rel="stylesheet"
          type="text/css"
          id="style_sheet"
          href="css/skins/default.css"
        />

        {/* <!-- Favicon icon --> */}
        <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon" />

        {/* <!-- Google fonts --> */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,300,700"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800%7CPlayfair+Display:400,700%7CRoboto:100,300,400,400i,500,700"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800%7CPlayfair+Display:400,700%7CRoboto:100,300,400,400i,500,700"
        />

        {/* <!-- IE10 viewport hack for Surface/desktop Windows 8 bug --> */}
        <link
          rel="stylesheet"
          type="text/css"
          href="css/ie10-viewport-bug-workaround.css"
        />

        {/* <!-- Just for debugging purposes. Don't actually copy these 2 lines! --> */}
        {/* <!--[if lt IE 9
      ]> */}

        <script src="js/ie-emulation-modes-warning.js"></script>

        {/* <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]> */}
      </head>
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
