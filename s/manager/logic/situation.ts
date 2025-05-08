
import {Identity} from "../../core/identity.js"
import {Intake} from "../views/pages/ingress/intake.js"

export namespace Situation {
	export type List = {
		kind: "list"
		onCreate: () => Promise<void>
		onEdit: (identity: Identity) => Promise<void>
		onDelete: (identities: Identity[]) => Promise<void>
		onEgress: (identities: Identity[]) => Promise<void>
		onIngress: () => Promise<void>
	}

	export type Create = {
		kind: "create"
		identities: Identity[]
		initialIdentity: Identity
		initialIdentitySeed: string
		onIngress: () => Promise<void>
		onSave: (identity: Identity) => Promise<void>
		onDone: () => Promise<void>
		onBack?: () => Promise<void>
	}

	export type Edit = {
		kind: "edit"
		seed: string
		identity: Identity
		onBack: () => Promise<void>
		onSave: (identity: Identity) => Promise<void>
		onDelete: (identity: Identity) => Promise<void>
	}

	export type Delete = {
		kind: "delete"
		identities: Identity[]
		onBack: () => Promise<void>
		onDelete: (ids: string[]) => Promise<void>
	}

	export type Ingress = {
		kind: "ingress"
		intake: Intake
		onBack: () => Promise<void>
		onSave: (identities: Identity[]) => Promise<void>
	}

	////////////////////////////////

	export type Any = List | Create | Edit | Delete | Ingress
}

