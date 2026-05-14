# WABT-es: ESモジュール版 WebAssembly Binary Toolkit

WABT-esは、WebAssembly Binary Toolkit (WABT) などのWebAssembly関連ツールを、ブラウザで利用可能なESモジュールとして提供するライブラリです。

## デモ
[WebAssembly Playground](https://code4fukui.github.io/WABT-es/)

## 機能
- WebAssembly (WASM) テキスト形式 (WAT) のパース
- WATからWASMバイナリを生成
- WASMバイナリをWATに変換
- WASMバイナリオブジェクトのダンプ
- WASMバイナリの解釈

## 使い方
WATからWASMバイナリを生成:

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

## ライセンス
[Apache License 2.0](https://github.com/code4fukui/WABT-es/blob/main/LICENSE)
