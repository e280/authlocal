
import {Kv, migrate} from "@e280/kv"

export async function bankMigrations(kv: Kv) {
	await navigator.locks.request("authlocal:migrate", async() =>
		migrate(kv, kv.cell("version"), [
			[0, async op => {
				type OldIdentity = {secret: string, alias?: string}
				type NewIdentity = {seed: string, alias?: string}
				for await (const [id, {secret, alias}] of kv.scope<OldIdentity>("identities").entries())
					op(kv.scope<NewIdentity>("identities").op.set(id, {seed: secret, alias}))
			}],
		])
	)
}

