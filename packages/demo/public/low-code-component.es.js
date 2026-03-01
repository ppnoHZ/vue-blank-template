const u = /* @__PURE__ */ Vue.defineComponent({
  __name: "Button",
  props: {
    msg: {},
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e,
      c = t,
      o = () => {
        c("change", n.msg);
      };
    return (s, m) => (
      Vue.openBlock(), Vue.createElementBlock("button", { onClick: o }, "Click me")
    );
  },
});
export { u as default };
