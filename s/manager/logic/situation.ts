
import {Passport} from "../../core/passport.js"
import {PassportStore} from "./passports/passport-store.js"
import {PassportsFile} from "./passports/passports-file.js"

export namespace Situation {
	export type List = {
		kind: "list"
		passportStore: PassportStore
		onCreate: () => void
		onEdit: (passport: Passport) => void
		onEgress: (passports: Passport[]) => void
		onIngress: (passportsFile: PassportsFile | undefined) => void
	}

	export type Create = {
		kind: "create"
		initialPassport: Passport
		onIngress: () => void
		onSaveNewPassport: (passport: Passport) => void
		onDone: () => void
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
		passports: Passport[]
		onBack: () => void
	}

	export type Ingress = {
		kind: "ingress"
		passports: PassportsFile | undefined
		onBack: () => void
		onAddPassports: (passports: Passport[]) => void
	}

	////////////////////////////////

	export type Any = List | Create | Edit | Delete | Egress | Ingress
}

