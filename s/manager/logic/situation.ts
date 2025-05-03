
import {Passport} from "../../core/passport.js"

export namespace Situation {
	export type List = {
		kind: "list"
		passports: Passport[]
		onCreate: () => Promise<void>
		onEdit: (passport: Passport) => Promise<void>
		onEgress: (passports: Passport[]) => Promise<void>
		onIngress: (passports?: Passport[]) => Promise<void>
	}

	export type Create = {
		kind: "create"
		passports: Passport[]
		initialPassport: Passport
		initialPassportSeed: string
		onIngress: () => Promise<void>
		onSave: (passport: Passport) => Promise<void>
		onDone: () => Promise<void>
		onCancel?: () => Promise<void>
	}

	export type Edit = {
		kind: "edit"
		seed: string
		passport: Passport
		onBack: () => Promise<void>
		onSave: (passport: Passport) => Promise<void>
		onDelete: (passport: Passport) => Promise<void>
	}

	export type Delete = {
		kind: "delete"
		passport: Passport
		onCancel: () => Promise<void>
		onDeleteConfirmed: (passport: Passport) => Promise<void>
	}

	export type Egress = {
		kind: "egress"
		passports: Passport[]
		onBack: () => Promise<void>
	}

	export type Ingress = {
		kind: "ingress"
		passports: Passport[] | undefined
		onBack: () => Promise<void>
		onAddPassports: (passports: Passport[]) => Promise<void>
	}

	////////////////////////////////

	export type Any = List | Create | Edit | Delete | Egress | Ingress
}

