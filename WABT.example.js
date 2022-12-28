import { WABT } from "./WABT.js";

const src = `(module
  (func (export "addTwo") (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add))
`;
const wabt = await WABT();
const module = wabt.parseWat("test.wast", src);
const mbin = module.toBinary({ log: true });
console.log(mbin.log);
await Deno.writeFile("addTwo.wasm", mbin.buffer);
const wasm = new WebAssembly.Module(mbin.buffer);
const instance = new WebAssembly.Instance(wasm, {});
const { addTwo } = instance.exports;
console.log(addTwo(10, 5));
