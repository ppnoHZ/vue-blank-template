// import Test from './components/Test.vue'

// export { Test }

export * from "./components";

let a = 1;
a = a; // no-self-assign

if (true) {
  console.log("constant condition");
}

const obj = {
  foo: 1,
  foo: 2,
};

a();
