(function () {
  "use strict";
  try {
    if (typeof document < "u") {
      var o = document.createElement("style");
      (o.appendChild(
        document.createTextNode(
          ".low-code-app button{margin:0 8px}.low-code-app .q-button[data-v-670e4154]{padding:8px 16px;background-color:var(--btn-bg, #42b983);border:none;border-radius:4px;color:#fff;cursor:pointer;transition:background-color .3s}",
        ),
      ),
        document.head.appendChild(o));
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
import { Component as u } from "./button.es.js";
const s = /* @__PURE__ */ Vue.defineComponent({
  __name: "ConfigProvider",
  props: {
    prefix: {},
  },
  setup(o) {
    const e = o.prefix || ".low-code-app".replace(/^\./, "");
    return (
      Vue.provide("style-prefix", e),
      (r, p) => (
        Vue.openBlock(),
        Vue.createElementBlock(
          "div",
          {
            class: Vue.normalizeClass(Vue.unref(e)),
          },
          [Vue.renderSlot(r.$slots, "default")],
          2,
        )
      )
    );
  },
});
export { u as Button, s as ConfigProvider };
