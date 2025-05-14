
import {ob} from "@e280/stz"
import {Auth} from "../auth.js"
import {Constructor, ShadowElement} from "@benev/slate"

export class AuthElement extends ShadowElement {
	auth!: Auth
}

export function provideAuth(auth: Auth) {
	return <E extends {[key: string]: Constructor<AuthElement>}>(elements: E) =>
		ob(elements).map(Elem => class extends Elem { auth = auth })
}

