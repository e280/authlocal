
import {Err} from "../utils/err.js"
import {Id, Keypair} from "../cryp/types.js"

/** public information about an identity */
export type Profile = {
	id: Id
	label: string
}

/** private keypair that identifies a user */
export type Identity = Keypair & Profile

/** human-friendly encoding of label and seed  */
export type Code = string

export class CodeIncompleteErr extends Err {}
export class CodeChecksumErr extends Err {}

