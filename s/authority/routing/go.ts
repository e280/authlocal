
import {hashNav} from "@e280/sly"
import {Bank} from "../sys/bank.js"

export type Go = ReturnType<typeof makeGo>

export const makeGo = (bank: Bank) => hashNav({
	list: () => ``,
	create: () => `create`,
	recovery: () => `recovery`,
	home: () => (
		(bank.identities.length)
			? ``
			: `create`
	),
})

