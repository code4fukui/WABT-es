import { wasm2wat } from "./wasm2wat.js";

const fn = Deno.args[0];
if (!fn) {
  console.log("deno run -A watda.js [*.wasm]");
  Deno.exit(1);
}
const bin = await Deno.readFile(fn);
console.log(bin);
const src = wasm2wat(bin);
console.log(src);
