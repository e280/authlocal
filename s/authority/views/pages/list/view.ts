
import {is, Thumbprint} from "@e280/stz"
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

import {manager} from "../../../context.js"
import {constants} from "../../../../constants.js"
import {hostcode} from "../../../utils/hostcode.js"
import {Situation} from "../../../logic/situation.js"
import {Downloader} from "../../../utils/downloader.js"
import {Identity} from "../../../../trust/exports/authority.js"
import {IdentityDraft} from "../../common/identity-widget/draft.js"
import {crushUsername} from "../../../../common/utils/crush-username.js"
import {IdentityWidget, IdentityWidgetOptions} from "../../common/identity-widget/view.js"

export const ListPage = shadowView(use => (
		situation: Situation.List,
	) => {

	use.name("list-page")
	use.styles([themeCss, stylesCss])

	const permits = manager.depot.identities.permits.value
	const identities = permits.map(p => p.identity)
	const seedMap = new Map(permits.map(p => [p.identity.id, p.seed]))
	const identityMap = new Map(permits.map(p => [p.identity.id, p.identity]))

	const purpose = manager.purpose.value
	const selectMode = use.signal(false)
	const selected = use.once(() => new Set<string>())
	const downloader = use.once(() => new Downloader(""))

	const clickNew = () => situation.onCreate()
	const clickImport = () => situation.onIngress()

	const clickSelectMode = () => {
		selected.clear()
		// identities.map(p => p.id).forEach(id => selected.add(id))
		selectMode.value = !selectMode.value
	}

	function renderNormalMode() {
		const renderIdentity = (identity: Identity) => {
			const clickEdit = () => situation.onEdit(identity)
			const options: IdentityWidgetOptions = {
				selected: false,
				onClick: purpose.kind === "login"
					// ? () => purpose.onIdentity(identity)
					? undefined
					: clickEdit,
			}
			return IdentityWidget([new IdentityDraft(identity), options], {content: html`
				<button
					class=edit
					theme-button
					theme-hush
					@click="${clickEdit}">
						Edit
				</button>

				${purpose.kind === "login" ? html`
					<button
						class=login
						theme-button=login
						theme-loud
						@click="${() => purpose.onIdentity(identity)}">
							Login
					</button>
				` : null}
			`})
		}
		return html`
			<div class=identities>
				${identities.map(renderIdentity)}
			</div>

			<footer theme-buttons>
				<button
					theme-button
					theme-hush
					@click="${clickSelectMode}">
						Select
				</button>

				<button
					theme-button
					theme-hush
					@click="${clickImport}">
						Import
				</button>

				<button
					theme-button=happy
					theme-hush
					@click="${clickNew}">
						New
				</button>
			</footer>
		`
	}

	function renderSelectMode() {
		const renderIdentity = (identity: Identity) => {
			const toggle = () => {
				const already = selected.has(identity.id)
				if (already) selected.delete(identity.id)
				else selected.add(identity.id)
				use.rerender()
			}
			const isSelected = selected.has(identity.id)
			const options: IdentityWidgetOptions = {
				selected: isSelected,
				onClick: toggle,
			}
			return IdentityWidget([new IdentityDraft(identity), options], {content: html`
				<button
					theme-button
					x-check
					?x-selected="${isSelected}"
					theme-alt
					@click="${toggle}"
				></button>
			`})
		}

		const selectAll = () => {
			identities.map(p => p.id).forEach(id => selected.add(id))
			use.rerender()
		}

		const deselectAll = () => {
			selected.clear()
			use.rerender()
		}

		const renderSelectedButtons = () => {
			const selectedIdentityIds = [...selected]
			const selectedSeeds = selectedIdentityIds
				.map(id => seedMap.get(id))
				.filter(is.available)
			const selectedIdentities = selectedIdentityIds
				.map(id => identityMap.get(id))
				.filter(is.available)

			downloader.text = selectedSeeds.join("\n\n")
			const filename = selectedIdentityIds.length === 1
				? crushUsername(Thumbprint.sigil.fromHex(selectedIdentityIds.at(0)!))
				: "identities" + constants.seedExtension

			return html`
				<button
					theme-button=angry
					@click="${() => situation.onDelete(selectedIdentities)}">
						Delete
				</button>

				<a class=button
					theme-button=seed
					theme-flasher
					download="${filename}"
					title="${`Download "${filename}"`}"
					href="${downloader.url}"
					@click="${() => downloader.flash()}">
						Download
				</button>
			`
		}

		return html`
			<div class=identities>
				${identities.map(renderIdentity)}
			</div>

			<p>${selected.size} selected</p>

			<footer theme-buttons>
				<button
					theme-button=back
					theme-hush
					@click="${clickSelectMode}">
						Back
				</button>

				${selected.size > 0 ? html`
					<button
						theme-button
						theme-hush
						@click="${deselectAll}">
							Deselect All
					</button>
				` : html`
					<button
						theme-button
						theme-hush
						@click="${selectAll}">
							Select All
					</button>
				`}

				${selected.size > 0
					? renderSelectedButtons()
					: null}
			</footer>
		`
	}

	return html`
		<section theme-plate
			x-purpose="${purpose.kind}"
			?x-select-mode="${selectMode.value}">

			<div theme-group>
				${purpose.kind === "login" ? html`
					<h2>
						${hostcode(purpose.appOrigin)}
						<span>wants your login</span>
					</h2>
				` : html`
					<h2>Your identities</h2>
				`}
			</div>

			${selectMode.value
				? renderSelectMode()
				: renderNormalMode()}
		</section>
	`
})

