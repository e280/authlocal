
import {html} from "@benev/slate"
import stylesCss from "./styles.css.js"
import {nexus} from "../../../nexus.js"
import {Authfile} from "../../../auth/file.js"
import {Situation} from "../../../logic/situation.js"
import {Breakdown} from "../../common/breakdown/view.js"

export const EgressPage = nexus.shadowView(use => (situation: Situation.Egress) => {
	use.styles(stylesCss)
	const {name, href} = Authfile.downloadable(situation.identities)

	return html`
		<section>
			<h3>Export your identity files, and put them in a secure place.</h3>
			<p>Authduo does not have any servers, and puts you in direct control over your identity files. Your identities are automatically stored locally in your device's web browser, but this storage may not be reliable.</p>

			<div class=special>
				${Breakdown([situation.identities])}
				<div class=download>
					<a class=button download="${name}" href="${href}">
						Export
					</a>
					<span>${name}</span>
				</div>
			</div>

			<p>You can import your identities on multiple devices. Never lose your identity files, and never share them with others. Once lost or compromised, identities are <strong>impossible</strong> to recover.</p>
			<p class=angry>If lost or compromised, identities are impossible to recover.</p>
		</section>

		<footer class=buttonbar>
			<button @click="${situation.onBack}">Back</button>
		</footer>
	`
})

