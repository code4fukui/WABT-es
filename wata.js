import { WABT } from "https://code4fukui.github.io/WABT-es/WABT.js";

const fn = Deno.args[0];
if (!fn) {
  console.log("deno run -A wata.js [*.wat]");
  Deno.exit(1);
}
const src = await Deno.readTextFile(fn);
const wabt = await WABT();
const module = wabt.parseWat("test.wast", src);
const mbin = module.toBinary({ log: true });
//console.log(mbin.log);
const wasm = new WebAssembly.Module(mbin.buffer);
const mem = new WebAssembly.Memory({ initial: 1 });
const instance = new WebAssembly.Instance(wasm, {
  console: {
    log: (off, len) => console.log(new TextDecoder().decode(new Uint8Array(mem.buffer, off, len))),
    log_i32: (n) => console.log(n),
    log_f32: (n) => console.log(n),
  },
  js: {
    mem,
  }
});
const { main } = instance.exports;
console.log(main());
