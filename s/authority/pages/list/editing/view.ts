
import {html} from "lit"
import {maybe} from "@e280/stz"
import {shadow, useCss, useName, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {RecoverySeed} from "../../../views/recovery-seed/view.js"
import {Identity} from "../../../types.js"
import {theme} from "../../../utils/theme.js"
import {address, allowEmptyString, deriveId, maxNameLength, seed, validateName} from "../../../../lib/index.js"

type EditingTab = "edit" | "seed" | "delete"

export const Editing = shadow((options: {
		identity: Identity
		close: () => void
		updateIdentity: (identity: Identity) => void
		deleteIdentity: (identity: Identity) => void
	}) => {

	useName("editing")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const short = address.short(id)
	const seedText = seed.from(options.identity.root)
	const $tab = useSignal<EditingTab>("edit")
	const $alias = useSignal(options.identity.alias)
	const $confirmation = useSignal("")
	const aliasMaybe = allowEmptyString(validateName)($alias())
	const aliasProblems = maybe.problems(aliasMaybe)
	const canSaveAlias = aliasMaybe.yay && $alias() !== options.identity.alias
	const canDelete = $confirmation() === short

	const setTab = (tab: EditingTab) => () => $tab(tab)

	const onAliasInput = (event: Event) => {
		$alias((event.currentTarget as HTMLInputElement).value)
	}

	const onConfirmationInput = (event: Event) => {
		$confirmation((event.currentTarget as HTMLInputElement).value)
	}

	const saveAlias = () => {
		if (!aliasMaybe.yay) return
		options.updateIdentity({
			...options.identity,
			alias: $alias(),
		})
		options.close()
	}

	const deleteIdentity = () => {
		if (!canDelete) return
		options.deleteIdentity(options.identity)
		options.close()
	}

	return html`
		<div class=panel>
			<header>
				<nav class=tabs aria-label="edit identity">
					<button
						x-vibe=naked
						?data-active="${$tab() === "edit"}"
						@click="${setTab("edit")}">
							edit
					</button>

					<button
						x-vibe=naked
						?data-active="${$tab() === "seed"}"
						@click="${setTab("seed")}">
							seed
					</button>

					<button
						x-vibe=naked
						?data-active="${$tab() === "delete"}"
						@click="${setTab("delete")}">
							delete
					</button>
				</nav>

				<button
					class=close
					x-vibe=naked
					aria-label="close editing panel"
					title="close"
					@click="${options.close}">
						x
				</button>
			</header>

			${$tab() === "edit"
				? html`
					<section class=section>
						<label class=field>
							<span>alias</span>
							<input
								class=input
								type=text
								placeholder="optional alias"
								maxlength="${maxNameLength}"
								.value="${$alias()}"
								@input="${onAliasInput}"
							/>
						</label>

						<p class=problems>${aliasProblems?.map(problem => `• ${problem}`).join(" ") ?? ""}</p>
						<p class=hint>leave it blank to fall back to <code>${short}</code>.</p>

						<nav class=actions>
							<button
								x-vibe=happy
								?disabled="${!canSaveAlias}"
								@click="${saveAlias}">
									save
							</button>
						</nav>
					</section>
				`
				: null}

			${$tab() === "seed"
				? html`
					<section class="section seed">
						${RecoverySeed({seedText})}
						<p class=hint>this seed fully restores <code>${short}</code>. keep it secret.</p>
					</section>
				`
				: null}

			${$tab() === "delete"
				? html`
					<section class="section warning">
						<p><strong>this is permanent.</strong> deleting this identity removes it from this device.</p>

						<label class=field>
							<span>type <code>${short}</code> exactly to confirm</span>
							<input
								class=input
								type=text
								placeholder="${short}"
								autocomplete=off
								spellcheck=false
								.value="${$confirmation()}"
								@input="${onConfirmationInput}"
							/>
						</label>

						<nav class=actions>
							<button
								x-vibe=angry
								?disabled="${!canDelete}"
								@click="${deleteIdentity}">
									delete forever
							</button>
						</nav>
					</section>
				`
				: null}
		</div>
	`
})
