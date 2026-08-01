
import {Sub} from "@e280/stz"
import {User} from "../user.js"
import {SessionOptions} from "./session-options.js"

export type AuthLike = {
	dispose: () => void
	on: Sub<[User | null]>
	readonly user: User | null
	remember(): Promise<User | null>
	logout(): Promise<void>
	loginViaPopup(options?: Partial<SessionOptions>): Promise<User | null>
}

