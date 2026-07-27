
import {Orb, dataSvgEmoji, html, socialCard} from "@e280/scute"

export function pageHead(orb: Orb, title: string) {
	return html`
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width,initial-scale=1"/>
		<meta name="darkreader-lock"/>

		<title>${title}</title>

		<link rel="icon" href="${dataSvgEmoji("🔐")}"/>
		<style>@layer base{html{background:#000}}</style>

		<style data-theme>
			${orb.inject("$/s/delegator/css/fonts.css")}
			${orb.inject("$/s/delegator/css/layers.css")}
			${orb.inject("$/s/delegator/css/vars.css")}
			${orb.inject("$/s/delegator/css/base.css")}
			${orb.inject("$/s/delegator/css/common.css")}
		</style>

		<style>
			${orb.inject("$/s/delegator/css/page.css")}
		</style>

		${socialCard({
			themeColor: "#77ff81",
			siteName: "authlocal.org",
			title: "authlocal is the user-sovereign login system.",
			description: "own your identity. cryptographic. passwordless. emailless. open-source.",
		})}
	`
}

