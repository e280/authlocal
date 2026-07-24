
import {hashNav} from "@e280/sly"
import {Context} from "../context.js"

export type Go = ReturnType<typeof makeGo>

export const makeGo = ({bank}: Context) => hashNav({
	list: () => ``,
	create: () => `create`,
	recovery: () => `recovery`,
	home: () => (
		(bank.identities.length)
			? ``
			: `create`
	),
})

