
import {Passport} from "../../core/passport.js"

export namespace Situation {
	export type List = {
		kind: "list"
		passports: Passport[]
		onCreate: () => void
		onEdit: (passport: Passport) => void
		onEgress: (passports: Passport[]) => void
		onIngress: (passports?: Passport[]) => void
	}

	export type Create = {
		kind: "create"
		passports: Passport[]
		initialPassport: Passport
		initialPassportSeed: string
		onIngress: () => void
		onSaveNewPassport: (passport: Passport) => Promise<void>
		onDone: () => void
		onCancel?: () => void
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
		onDeleteConfirmed: (passport: Passport) => void
	}

	export type Egress = {
		kind: "egress"
		passports: Passport[]
		onBack: () => void
	}

	export type Ingress = {
		kind: "ingress"
		passports: Passport[] | undefined
		onBack: () => void
		onAddPassports: (passports: Passport[]) => void
	}

	////////////////////////////////

	export type Any = List | Create | Edit | Delete | Egress | Ingress
}

