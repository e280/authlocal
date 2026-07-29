
/** 64 hex characters */
export type Hex = string

/** secret hex key derived from the seed */
export type Secret = Hex

/** ed25519 public hex key */
export type Id = Hex

/** ed25519 keypair */
export type Keypair = {
	id: Id
	secret: Secret
}

