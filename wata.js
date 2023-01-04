import { WABT } from "https://code4fukui.github.io/WABT-es/WABT.js";
import { program } from 'https://code4fukui.github.io/commander-es/index.js';

program
  .version("0.0.1")
  .argument("<*.wat>")
  .option("--run")
  .parse();

const fn = program.processedArgs[0];
const opts = program.opts();

const src = await Deno.readTextFile(fn);
const wabt = await WABT();
const module = wabt.parseWat("test.wast", src);
const mbin = module.toBinary({ log: true });
const bin = mbin.buffer;
await Deno.writeFile(fn.substring(0, fn.length - 3) + "wasm", bin);

if (opts.run) {
  //console.log(mbin.log);
  const wasm = new WebAssembly.Module(bin);
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
  if (instance.exports.main) {
    console.log(instance.exports.main());
  }
}
