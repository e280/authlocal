
export type Passport = {
	id: string
	pubkey: string
}

export type Seed = string

export type Secret = {
	seed: Seed
	passport: Passport
}

