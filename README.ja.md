# WABT-es: WebAssemblyバイナリツールキットのESモジュール版

1〜2文で説明。WebAssembly関連のツールをESモジュールで利用できるライブラリ。

## デモ
[WebAssemblyプレイグラウンド](https://code4fukui.github.io/WABT-es/)

## 機能
- WebAssembly (WASM) テキスト形式 (WAT) のパース
- WAT形式からWASMバイナリの生成
- WASMバイナリからWAT形式への変換
- WASMバイナリのオブジェクトダンプ
- WASMバイナリのインタプリタ実行

## 使い方
WAT形式からWASMバイナリを生成:

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