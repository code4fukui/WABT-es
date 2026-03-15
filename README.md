# WABT-es: The WebAssembly Binary Toolkit as an ESmodule

WABT (we pronounce it "wabbit") is a suite of tools for WebAssembly, including:

- [DEMO: WebAssembly playground](https://code4fukui.github.io/WABT-es/)

```JavaScript
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
const wasm = new WebAssembly.Module(mbin.buffer);
const instance = new WebAssembly.Instance(wasm, {});
const { addTwo } = instance.exports;
console.log(addTwo(10, 5));
```

to make WABT.js from docs/demo/libwabt.js
```sh
$ make es
```

## WAT assembler

```sh
$ deno run -A https://code4fukui.github.io/WABT-es/wata.js wata.test.wat
```

to install
```sh
$ deno install -A https://code4fukui.github.io/WABT-es/wata.js
$ wata
```

## WAT disassembler
```sh
$ deno run -A https://code4fukui.github.io/WABT-es/watda.js wata.test.wasm
```

to install
```sh
$ deno install -A https://code4fukui.github.io/WABT-es/watda.js
$ watda
```

## reference

 - [**wat2wasm**](https://webassembly.github.io/wabt/doc/wat2wasm.1.html): translate from [WebAssembly text format](https://webassembly.github.io/spec/core/text/index.html) to the [WebAssembly binary format](https://webassembly.github.io/spec/core/binary/index.html)
 - [**wasm2wat**](https://webassembly.github.io/wabt/doc/wasm2wat.1.html): the inverse of wat2wasm, translate from the binary format back to the text format (also known as a .wat)
 - [**wasm-objdump**](https://webassembly.github.io/wabt/doc/wasm-objdump.1.html): print information about a wasm binary. Similiar to objdump.
 - [**wasm-interp**](https://webassembly.github.io/wabt/doc/wasm-interp.1.html): decode and run a WebAssembly binary file using a stack-based interpreter
 - [**wasm-decompile**](https://webassembly.github.io/wabt/doc/wasm-decompile.1.html): decompile a wasm binary into readable C-like syntax.
 - [**wat-desugar**](https://webassembly.github.io/wabt/doc/wat-desugar.1.html): parse .wat text form as supported by the spec interpreter (s-expressions, flat syntax, or mixed) and print "canonical" flat format
 - [**wasm2c**](https://webassembly.github.io/wabt/doc/wasm2c.1.html): convert a WebAssembly binary file to a C source and header
 - [**wasm-strip**](https://webassembly.github.io/wabt/doc/wasm-strip.1.html): remove sections of a WebAssembly binary file
 - [**wasm-validate**](https://webassembly.github.io/wabt/doc/wasm-validate.1.html): validate a file in the WebAssembly binary format
 - [**wast2json**](https://webassembly.github.io/wabt/doc/wast2json.1.html): convert a file in the wasm spec test format to a JSON file and associated wasm binary files
 - [**wasm-opcodecnt**](https://webassembly.github.io/wabt/doc/wasm-opcodecnt.1.html): count opcode usage for instructions
 - [**spectest-interp**](https://webassembly.github.io/wabt/doc/spectest-interp.1.html): read a Spectest JSON file, and run its tests in the interpreter

These tools are intended for use in (or for development of) toolchains or other
systems that want to manipulate WebAssembly files. Unlike the WebAssembly spec
interpreter (which is written to be as simple, declarative and "speccy" as
possible), they are written in C/C++ and designed for easier integration into
other systems. Unlike [Binaryen](https://github.com/WebAssembly/binaryen) these
tools do not aim to provide an optimization platform or a higher-level compiler
target; instead they aim for full fidelity and compliance with the spec (e.g.
1:1 round-trips with no changes to instructions).

## Online Demos

Wabt has been compiled to JavaScript via emscripten. Some of the functionality is available in the following demos:

- [index](https://webassembly.github.io/wabt/demo/)
- [wat2wasm](https://webassembly.github.io/wabt/demo/wat2wasm/)
- [wasm2wat](https://webassembly.github.io/wabt/demo/wasm2wat/)

## Supported Proposals

* Proposal: Name and link to the WebAssembly proposal repo
* flag: Flag to pass to the tool to enable/disable support for the feature
* default: Whether the feature is enabled by default
* binary: Whether wabt can read/write the binary format
* text: Whether wabt can read/write the text format
* validate: Whether wabt can validate the syntax
* interpret: Whether wabt can execute these operations in `wasm-interp` or `spectest-interp`
* wasm2c: Whether wasm2c supports these operations

| Proposal   | flag | default | binary | text | validate | interpret | wasm2c |
| --------------------- | --------------------------- | - | - | - | - | - | - |
| [exception handling][]| `--enable-exceptions`       |   | ✓ | ✓ | ✓ | ✓ | ✓ |
| [mutable globals][]   | `--disable-mutable-globals` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [nontrapping float-to-int conversions][] | `--disable-saturating-float-to-int` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [sign extension][]    | `--disable-sign-extension`  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [simd][]              | `--disable-simd`            | ✓ | ✓ | ✓ | ✓ | ✓ |   |
| [threads][]           | `--enable-threads`          |   | ✓ | ✓ | ✓ | ✓ |   |
| [multi-value][]       | `--disable-multi-value`     | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [tail-call][]         | `--enable-tail-call`        |   | ✓ | ✓ | ✓ | ✓ |   |
| [bulk memory][]       |