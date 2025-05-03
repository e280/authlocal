
import {html, shadowView} from "@benev/slate"

import {manager} from "../../../context.js"

import {Situation} from "../../../logic/situation.js"
import {Passport} from "../../../../core/passport.js"
import {PassportWidget, PassportWidgetOptions} from "../../common/passport-widget/view.js"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"
import {PassportDraft} from "../../common/passport-widget/draft.js"

export const ListPage = shadowView(use => (
		situation: Situation.List,
	) => {

	use.styles([themeCss, stylesCss])

	const purpose = manager.purpose.value
	const passports = use.signal(situation.passports)
	const selectMode = use.signal(false)
	const selected = use.once(() => new Set<string>())

	const clickNew = () => situation.onCreate()

	const clickSelectMode = () => {
		selected.clear()
		selectMode.value = !selectMode.value
	}

	function renderNormalMode() {
		const renderPassport = (passport: Passport) => {
			const clickEdit = () => situation.onEdit(passport)
			const options: PassportWidgetOptions = {
				selected: false,
				onClick: purpose.kind === "login"
					? () => purpose.onPassport(passport)
					: clickEdit,
			}
			return PassportWidget([new PassportDraft(passport), options], {content: html`
				<button class=edit
					@click="${clickEdit}">
						Edit
				</button>

				${purpose.kind === "login" ? html`
					<button class=login
						theme-login
						@click="${() => purpose.onPassport(passport)}">
							Login
					</button>
				` : null}
			`})
		}
		return html`
			<div class=passports>
				${passports.value.map(renderPassport)}
			</div>

			<footer theme-buttons>
				${purpose.kind === "login" ? html`
					<button theme-angry @click="${() => purpose.onDeny()}">
						Deny Login
					</button>
				` : null}

				<button @click="${clickSelectMode}">
					Select
				</button>

				<button>
					Import
				</button>

				<button theme-happy @click="${clickNew}">
					New
				</button>
			</footer>
		`
	}

	function renderSelectMode() {
		const renderPassport = (passport: Passport) => {
			const toggle = () => {
				const already = selected.has(passport.id)
				if (already) selected.delete(passport.id)
				else selected.add(passport.id)
				use.rerender()
			}
			const isSelected = selected.has(passport.id)
			const options: PassportWidgetOptions = {
				selected: isSelected,
				onClick: toggle,
			}
			return PassportWidget([new PassportDraft(passport), options], {content: html`
				<button x-check ?x-selected="${isSelected}" theme-alt @click="${toggle}"></button>
			`})
		}
		return html`
			<div class=passports>
				${passports.value.map(renderPassport)}
			</div>

			<p>${selected.size} selected</p>

			<footer theme-buttons>
				<button theme-back @click="${clickSelectMode}">
					Back
				</button>

				${selected.size > 0 ? html`
					<button theme-angry>
						Delete
					</button>

					<button theme-happy>
						Download
					</button>
				` : null}
			</footer>
		`
	}

	return html`
		<section theme-plate
			x-purpose="${purpose.kind}"
			?x-select-mode="${selectMode.value}">

			<div theme-group>
				<h2>
					${purpose.kind === "login"
						? html`Login request from <code theme-login>${purpose.hostname}</code>`
						: html`Your login passports`}
				</h2>
				${purpose.kind === "login"
					? html`<p>You can choose one of your passports, or deny the request</p>`
					: null}
			</div>

			${selectMode.value
				? renderSelectMode()
				: renderNormalMode()}
		</section>
	`
})

