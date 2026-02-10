
import {Root} from "../cryp/types.js"
import {purposes} from "./purposes.js"
import {hashText} from "../cryp/kit.js"
import {deriveSecret} from "../cryp/derive.js"

export async function deriveViceroy(root: Root, appOrigin: string) {
	return deriveSecret(root, `${purposes.viceroy}:${await hashText(appOrigin)}`)
}

