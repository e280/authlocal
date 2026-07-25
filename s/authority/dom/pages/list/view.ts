
import {html} from "lit"
import {when} from "lit/directives/when.js"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import {theme} from "../../theme.js"
import styleCss from "./style.css.js"
import {Ident} from "./ident/view.js"
import {Identity} from "../../../types.js"
import {Editing} from "./editing/view.js"
import {deriveId, Id} from "../../../../lib/core/index.js"
import dotsIcon from "../../../../lib/ui/icons/tabler/dots.icon.js"

export const ListPage = shadow((options: {
		loginRequest?: {
			appOrigin: string
			login: (identity: Identity) => void
		}
		identities: Identity[]
		goCreate: () => void
		goRecovery: () => void
		updateIdentity: (identity: Identity) => void
		deleteIdentity: (identity: Identity) => void
	}) => {

	useName("list page")
	useCss(theme(), styleCss)
	const $editing = useSignal<Id | null>(null)

	function renderIdentity(identity: Identity) {
		const id = deriveId(identity.root)

		const toggleEditing = () => $editing(
			$editing() === id
				? null
				: id
		)

		return Ident.with({
			props: [{identity}],
			children: html`
				<button
					slot=buttons
					x-vibe=naked
					@click="${toggleEditing}">
						${dotsIcon}
				</button>

				${when(options.loginRequest, ({login}) => html`
					<button
						slot=buttons
						x-vibe=login
						@click="${() => login(identity)}">
							login
					</button>
				`)}

				${$editing() === id
					? Editing({
						identity,
						close: () => $editing(null),
						updateIdentity: options.updateIdentity,
						deleteIdentity: options.deleteIdentity,
					})
					: null}
			`,
		})
	}

	return html`
		<div x-title>
			${options.loginRequest ? html`
				<h2>a website is requesting your login</h2>
			` : html`
				<h2>
					${options.identities.length === 1
						? "this identity is on your device"
						: "these identities are on your device"}
				</h2>
			`}
			<hr/>
		</div>

		${when(options.loginRequest, ({appOrigin}) => html`
			<div x-banner>
				<p>the request is from <code>${appOrigin}</code>.</p>
				<p>you can deny this request by closing this window.</p>
			</div>
		`)}

		<div x-plate>
			<ol>
				${options.identities.map(renderIdentity)}
			</ol>

			<nav x-nav>
				<button
					x-linky
					x-vibe=lame
					@click="${options.goRecovery}">
						recover
				</button>
				from a seed,

				or
				<button
					x-linky
					@click="${options.goCreate}">
						create a new identity
				</button>
			</nav>
		</div>
	`
})

