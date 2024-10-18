
export class CryptoConstants {
	static thumbalgo = "SHA-256" as const
	static algo = {name: "ECDSA", namedCurve: "P-256"}
	static format = {public: "spki" as const, private: "pkcs8" as const}
}

