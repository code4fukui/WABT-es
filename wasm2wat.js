import { WABT } from "./WABT.js";

const wabt = await WABT();

export const wasm2wat = (wasm) => {
  const module2 = wabt.readWasm(wasm, { readDebugNames: true });
  const src = module2.toText({});
  return src;
};

