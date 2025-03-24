
export class CryptoConstants {
	static formats = {public: "spki" as const, private: "pkcs8" as const}
	static algos = {
		generate: {name: "ECDSA" as const, namedCurve: "P-256" as const},
		signing: {name: "ECDSA" as const, hash: {name: "SHA-256" as const}},
		thumbprint: "SHA-256" as const,
	}
}

