
import {Auth} from "../auth.js"
import {AuthOptions} from "../types.js"

export class AuthSingleton {
	#auth: Auth | null = null

	install = async(options: Partial<AuthOptions> = {}) => {
		if (this.#auth)
			throw new Error("Auth already installed")
		this.#auth = new Auth(options)
		await this.#auth.loadLogin()
		return this.#auth
	}

	get = () => {
		if (!this.#auth)
			throw new Error("Auth not installed")
		return this.#auth
	}
}

