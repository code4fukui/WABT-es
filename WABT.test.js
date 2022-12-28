import * as t from "https://deno.land/std/testing/asserts.ts";
import { WABT } from "./WABT.js";

const wabt = await WABT(); // parseWat, readWasm

const src = `(module
  (func (export "addTwo") (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add))
`;
const features = { // wabt.FEATURES
  exceptions: false,
  mutable_globals: true,
  sat_float_to_int: true,
  sign_extension: true,
  simd: true,
  threads: true,
  function_references: true,
  multi_value: true,
  tail_call: true,
  bulk_memory: true,
  reference_types: true,
  annotations: true,
  code_metadata: true,
  gc: true,
  memory64: true,
  extended_const: true,
  relaxed_simd: true,
};
const module = wabt.parseWat("test.wast", src, features);
module.resolveNames();
module.validate(features);
const mbin = module.toBinary({ log: true, write_debug_names: true });
const bin = mbin.buffer;
//console.log(mbin.log);

const wasm = new WebAssembly.Module(bin);
const instance = new WebAssembly.Instance(wasm, {});
const { addTwo } = instance.exports;

Deno.test("parseWat", () => {
  for (let i = 0; i < 10; i++) {
    t.assertEquals(addTwo(i, i), i + i);
  }  
});

const module2 = wabt.readWasm(bin, { readDebugNames: true });
const src2 = module2.toText({});
//console.log(src2);
const srct = `(module
  (type (;0;) (func (param i32 i32) (result i32)))
  (func (;0;) (type 0) (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add)
  (export "addTwo" (func 0)))
`;
Deno.test("readWasm", () => {
  t.assertEquals(src2, srct);
});
