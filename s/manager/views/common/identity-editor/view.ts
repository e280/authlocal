
import {deep, html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {theme} from "../../../../common/theme.js"
import {whence} from "../../../../tools/whence.js"
import {Identity} from "../../../../common/auth/identity.js"
import {inputString} from "../../../../tools/input-string.js"
import {validName} from "../../../../common/auth/utils/validation.js"

export const IdentityEditor = shadowView(use => ({identity, onUpdate}: {
		identity: Identity
		onUpdate: (identity: Identity | null) => void
	}) => {

	use.styles([theme, stylesCss])

	const name = use.signal(identity.name)
	const valid = use.signal(true)

	function validate() {
		valid.value = validName(name.value)
		if (valid.value) {
			const draft = deep.clone(identity)
			draft.name = name.value
			onUpdate(draft)
		}
		else {
			onUpdate(null)
		}
	}

	function updateName(n: string) {
		name.value = n
		validate()
	}

	return html`
		<section class=form>
			<label>
				<span>Name</span>

				<input
					type=text
					.value="${name.value}"
					@input="${inputString(updateName)}"
					?data-angry="${!validName(name.value)}"
					/>

				<small>
					<span>${whence(identity.created)}</span>
					<span>${identity.thumbprint.slice(0, 8)}</span>
				</small>

				${!validName(name.value) ? html`
					<small class=angry>invalid name</small>
				` : null}
			</label>
		</section>
	`
})

