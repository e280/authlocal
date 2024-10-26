
import {isNode} from "../../tools/is-node.js"

export async function getCrypto() {
	return (
		isNode()
			? (await import("crypto")).webcrypto
			: self.crypto
	) as any as Crypto
}

