
/** 64 hex characters */
export type Hex = string

/** completely random 64 hex chars */
export type Seed = Hex

/** ed25519 public key as 64 hex chars (derived from seed) */
export type Id = Hex

/** ed25519 private key as 64 hex chars (derived from seed) */
export type Secret = Hex

/** ed25519 keypair */
export type Keypair = {
	id: Id
	secret: Secret
}

