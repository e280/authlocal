
import {Idstore} from "./authstore.js"
import {Idfile} from "../../common/auth/idfile.js"
import {Identity} from "../../common/auth/identity.js"

export namespace Situation {
	export type List = {
		kind: "list"
		idstore: Idstore
		onCreate: () => void
		onEdit: (identity: Identity) => void
		onEgress: (identities: Identity[]) => void
		onIngress: (identities: Idfile | undefined) => void
	}

	export type Create = {
		kind: "create"
		identity: Identity
		onCancel: () => void
		onComplete: (identity: Identity) => void
	}

	export type Edit = {
		kind: "edit"
		identity: Identity
		onCancel: () => void
		onDelete: (identity: Identity) => void
		onComplete: (identity: Identity) => void
	}

	export type Delete = {
		kind: "delete"
		identity: Identity
		onCancel: () => void
		onComplete: (identity: Identity) => void
	}

	export type Egress = {
		kind: "egress"
		identities: Identity[]
		onBack: () => void
	}

	export type Ingress = {
		kind: "ingress"
		identities: Idfile | undefined
		onBack: () => void
		onAddIdentities: (identities: Identity[]) => void
	}

	////////////////////////////////

	export type Any = List | Create | Edit | Delete | Egress | Ingress
}

