
import {Hex} from "../cryp/types.js"

/** either a 128-bit seed that can be expanded into a secret, or directly 256-bit secret key. */
export type Seed = Hex

/** human-friendly 10-word representation of a 128-bit seed, or might be an 18-word representation of a secret key. */
export type Seedphrase = string

