
import {html, shadowView} from "@benev/slate"
import stylesCss from "./styles.css.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {Breakdown} from "../../common/breakdown/view.js"
import {PassportsFile} from "../../../../auth/passports-file.js"

export const EgressPage = shadowView(use => (situation: Situation.Egress) => {
	use.styles([themeCss, stylesCss])
	const passportsFile = new PassportsFile().add(...situation.passports)
	const name = passportsFile.filename()

	return html`
		<section>
			<h3>Export your passport files, and put them in a secure place.</h3>
			<p>Authduo does not have any servers, and puts you in direct control over your passport files. Your passports are automatically stored locally in your device's web browser, but this storage may not be reliable.</p>

			<div class=special>
				${Breakdown([situation.passports])}
				<div class=download>
					<a class=button download="${name}" href="${passportsFile.href()}">
						Export
					</a>
					<span>${name}</span>
				</div>
			</div>

			<p>You can import your passports on multiple devices. Never lose your passport files, and never share them with others. Once lost or compromised, passports are <strong>impossible</strong> to recover.</p>
			<p class=angry>If lost or compromised, passports are impossible to recover.</p>
		</section>

		<footer class=buttonbar>
			<button @click="${situation.onBack}">Back</button>
		</footer>
	`
})

