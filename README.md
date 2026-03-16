# WABT-es: The WebAssembly Binary Toolkit as an ESmodule

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

WABT-es is a library that provides WebAssembly-related tools, such as the WebAssembly Binary Toolkit (WABT), as ES modules for use in the browser.

## Demo
[WebAssembly playground](https://code4fukui.github.io/WABT-es/)

## Features
- Parse WebAssembly (WASM) text format (WAT)
- Generate WASM binary from WAT
- Convert WASM binary to WAT
- Dump WASM binary object
- Interpret WASM binary

## Usage
Generate WASM binary from WAT:

```javascript
import { WABT } from "https://code4fukui.github.io/WABT-es/WABT.js";

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
```

## License
[Apache License 2.0](https://github.com/code4fukui/WABT-es/blob/main/LICENSE)