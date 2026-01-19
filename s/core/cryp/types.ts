
/** 64 hex characters */
export type Hex = string

/** root secret from which secret keys are derived */
export type Seed = Hex

/** ed25519 public key as 64 hex chars (derived from seed) */
export type Id = Hex

/** ed25519 keypair */
export type Keypair = {
	id: Id
	seed: Seed
}

