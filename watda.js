import { wasm2wat } from "./wasm2wat.js";
import { program } from 'https://code4fukui.github.io/commander-es/index.js';

program
  .version("0.0.1")
  .argument("<*.wasm>")
  .parse();

const fn = program.processedArgs[0];
//const opts = program.opts();

const bin = await Deno.readFile(fn);
console.log(bin);
const src = wasm2wat(bin);
console.log(src);
