import { WABT } from "./WABT.js";

const wabt = await WABT();

export const wat2wasm = (wat) => {
	const module = wabt.parseWat("test.wast", wat);
	const mbin = module.toBinary({ log: true });
	return mbin.buffer;
};
