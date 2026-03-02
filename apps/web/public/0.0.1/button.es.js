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
const a = /* @__PURE__ */ Vue.defineComponent({
    __name: "Button",
    props: {
      msg: {},
    },
    emits: ["change"],
    setup(t, { emit: c }) {
      const o = t,
        u = c,
        e = Vue.ref(0),
        l = Vue.computed(() => {
          let n = "#42b983";
          return (
            e.value >= 10,
            e.value >= 5 ? (n = "red") : e.value >= 3 && (n = "#f39c12"),
            { "--btn-bg": n }
          );
        }),
        s = () => {
          (e.value++,
            e.value > 10 && (e.value = 1),
            console.log("Button clicked, count:", e.value),
            u("change", o.msg));
        };
      return (n, i) => (
        Vue.openBlock(),
        Vue.createElementBlock(
          "button",
          {
            class: "q-button",
            style: Vue.normalizeStyle(l.value),
            onClick: s,
          },
          "Click me (" + Vue.toDisplayString(e.value) + ")",
          5,
        )
      );
    },
  }),
  r = (t, c) => {
    const o = t.__vccOpts || t;
    for (const [u, e] of c) o[u] = e;
    return o;
  },
  m = /* @__PURE__ */ r(a, [["__scopeId", "data-v-670e4154"]]);
export { m as Component };
