
/** 64 hex characters */
export type Hex = string

/** root secret hex key from which more secrets are derived */
export type Seed = Hex

/** secret hex key derived from the seed */
export type Secret = Hex

/** ed25519 public hex key */
export type Id = Hex

/** ed25519 keypair */
export type Keypair = {
	id: Id
	secret: Secret
}

