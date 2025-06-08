// components/LiveChatScript.js
"use client";

import { useEffect } from "react";

export default function LiveChatScript() {
  useEffect(() => {
    window.__lc = window.__lc || {};
    window.__lc.license = 18235035;
    window.__lc.integration_name = "manual_onboarding";
    window.__lc.product_name = "livechat";
    (function (n, t, c) {
      function i(n) {
        return e._h ? e._h.apply(null, n) : e._q.push(n);
      }
      var e = {
        _q: [],
        _h: null,
        _v: "2.0",
        on: function () {
          i(["on", c.call(arguments)]);
        },
        once: function () {
          i(["once", c.call(arguments)]);
        },
        off: function () {
          i(["off", c.call(arguments)]);
        },
        get: function () {
          if (!e._h)
            throw new Error(
              "[LiveChatWidget] You can't use getters before load."
            );
          return i(["get", c.call(arguments)]);
        },
        call: function () {
          i(["call", c.call(arguments)]);
        },
        init: function () {
          var n = t.createElement("script");
          (n.async = !0),
            (n.type = "text/javascript"),
            (n.src = "https://cdn.livechatinc.com/tracking.js"),
            t.head.appendChild(n);
        },
      };
      !n.__lc.asyncInit && e.init(), (n.LiveChatWidget = n.LiveChatWidget || e);
    })(window, document, [].slice);
    // Hide the widget by default
    window.LiveChatWidget.on("ready", function () {
      window.LiveChatWidget.call("hide");
    });
  }, []);

  //   <!-- Start of LiveChat (www.livechat.com) code -->
  // <script>

  // </script>
  // <noscript><a href="https://www.livechat.com/chat-with/18235035/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>
  // <!-- End of LiveChat code -->

  return null;
}
