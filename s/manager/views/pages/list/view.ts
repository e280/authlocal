
import {is} from "@e280/stz"
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"

import {manager} from "../../../context.js"
import {hostcode} from "../../../utils/hostcode.js"
import {Situation} from "../../../logic/situation.js"
import {Identity} from "../../../../core/identity.js"
import {Downloader} from "../../../utils/downloader.js"
import {idPreview} from "../../../../tools/id-preview.js"
import {IdentityDraft} from "../../common/identity-widget/draft.js"
import {crushUsername} from "../../../../common/utils/crush-username.js"
import {IdentityWidget, IdentityWidgetOptions} from "../../common/identity-widget/view.js"

export const ListPage = shadowView(use => (
		situation: Situation.List,
	) => {

	use.name("list-page")
	use.styles([themeCss, stylesCss])

	const permits = manager.depot.identities.permits.value
	const passports = permits.map(p => p.identity)
	const seedMap = new Map(permits.map(p => [p.identity.id, p.seed]))
	const passportMap = new Map(permits.map(p => [p.identity.id, p.identity]))

	const purpose = manager.purpose.value
	const selectMode = use.signal(false)
	const selected = use.once(() => new Set<string>())
	const downloader = use.once(() => new Downloader(""))

	const clickNew = () => situation.onCreate()
	const clickImport = () => situation.onIngress()

	const clickSelectMode = () => {
		selected.clear()
		// passports.map(p => p.id).forEach(id => selected.add(id))
		selectMode.value = !selectMode.value
	}

	function renderNormalMode() {
		const renderPassport = (passport: Identity) => {
			const clickEdit = () => situation.onEdit(passport)
			const options: IdentityWidgetOptions = {
				selected: false,
				onClick: purpose.kind === "login"
					// ? () => purpose.onPassport(passport)
					? undefined
					: clickEdit,
			}
			return IdentityWidget([new IdentityDraft(passport), options], {content: html`
				<button
					theme-button
					class=edit
					@click="${clickEdit}">
						Edit
				</button>

				${purpose.kind === "login" ? html`
					<button
						class=login
						theme-button=login
						@click="${() => purpose.onIdentity(passport)}">
							Login
					</button>
				` : null}
			`})
		}
		return html`
			<div class=passports>
				${passports.map(renderPassport)}
			</div>

			<footer theme-buttons>
				<button theme-button @click="${clickSelectMode}">
					Select
				</button>

				<button theme-button @click="${clickImport}">
					Import
				</button>

				<button theme-button=happy @click="${clickNew}">
					New
				</button>
			</footer>
		`
	}

	function renderSelectMode() {
		const renderPassport = (passport: Identity) => {
			const toggle = () => {
				const already = selected.has(passport.id)
				if (already) selected.delete(passport.id)
				else selected.add(passport.id)
				use.rerender()
			}
			const isSelected = selected.has(passport.id)
			const options: IdentityWidgetOptions = {
				selected: isSelected,
				onClick: toggle,
			}
			return IdentityWidget([new IdentityDraft(passport), options], {content: html`
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
			passports.map(p => p.id).forEach(id => selected.add(id))
			use.rerender()
		}

		const deselectAll = () => {
			selected.clear()
			use.rerender()
		}

		const renderSelectedButtons = () => {
			const selectedPassportIds = [...selected]
			const selectedSeeds = selectedPassportIds
				.map(id => seedMap.get(id))
				.filter(is.available)
			const selectedPassports = selectedPassportIds
				.map(id => passportMap.get(id))
				.filter(is.available)

			downloader.text = selectedSeeds.join("\n\n")
			const filename = selectedPassportIds.length === 1
				? crushUsername(idPreview(selectedPassportIds.at(0)!))
				: `passports-${selected.size}.authlocal`

			return html`
				<button
					theme-button=angry
					@click="${() => situation.onDelete(selectedPassports)}">
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
			<div class=passports>
				${passports.map(renderPassport)}
			</div>

			<p>${selected.size} selected</p>

			<footer theme-buttons>
				<button theme-button=back @click="${clickSelectMode}">
					Back
				</button>

				${selected.size > 0 ? html`
					<button theme-button @click="${deselectAll}">
						Deselect All
					</button>
				` : html`
					<button theme-button @click="${selectAll}">
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
						<span>Login for</span>
						${hostcode(purpose.hostname)}
					</h2>
					<p>This website is requesting your login</p>
				` : html`
					<h2>Your login passports</h2>
				`}
			</div>

			${selectMode.value
				? renderSelectMode()
				: renderNormalMode()}
		</section>
	`
})

