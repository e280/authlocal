
import {hashNav} from "@e280/sly"
import {Bank} from "../sys/bank.js"
import {address, Id} from "../../core/index.js"

export type Go = ReturnType<typeof makeGo>

export const makeGo = (bank: Bank) => hashNav({
	list: () => ``,
	create: () => `create`,
	edit: (id: Id) => `edit/${address.from(id)}`,
	seed: (id: Id) => `seed/${address.from(id)}`,
	delete: (id: Id) => `delete/${address.from(id)}`,
	recovery: () => `recovery`,
	home: () => (
		(bank.identities.length)
			? ``
			: `create`
	),
})

