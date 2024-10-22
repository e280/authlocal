
import {Idstore} from "./authstore.js"
import {Passport} from "../../auth/identity.js"
import {PassportsFile} from "../../auth/idfile.js"

export namespace Situation {
	export type List = {
		kind: "list"
		idstore: Idstore
		onCreate: () => void
		onEdit: (passport: Passport) => void
		onEgress: (passports: Passport[]) => void
		onIngress: (passportsFile: PassportsFile | undefined) => void
	}

	export type Create = {
		kind: "create"
		passport: Passport
		onCancel: () => void
		onComplete: (passport: Passport) => void
	}

	export type Edit = {
		kind: "edit"
		passport: Passport
		onCancel: () => void
		onDelete: (passport: Passport) => void
		onComplete: (passport: Passport) => void
	}

	export type Delete = {
		kind: "delete"
		passport: Passport
		onCancel: () => void
		onComplete: (passport: Passport) => void
	}

	export type Egress = {
		kind: "egress"
		identities: Passport[]
		onBack: () => void
	}

	export type Ingress = {
		kind: "ingress"
		identities: PassportsFile | undefined
		onBack: () => void
		onAddIdentities: (identities: Passport[]) => void
	}

	////////////////////////////////

	export type Any = List | Create | Edit | Delete | Egress | Ingress
}

