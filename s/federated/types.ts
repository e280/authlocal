
import {LoginSessionTokens} from "../auth/tokens/types.js"

export type AuthFile = {
	version: number
	tokens: LoginSessionTokens | null
}

