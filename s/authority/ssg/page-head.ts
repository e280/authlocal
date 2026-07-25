
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
			${orb.inject("$/s/authority/css/fonts.css")}
			${orb.inject("$/s/authority/css/layers.css")}
			${orb.inject("$/s/authority/css/vars.css")}
			${orb.inject("$/s/authority/css/base.css")}
			${orb.inject("$/s/authority/css/common.css")}
		</style>

		<style>
			${orb.inject("$/s/authority/css/page.css")}
		</style>

		${socialCard({
			themeColor: "#77ff81",
			siteName: "authlocal.org",
			title: "authlocal – user-sovereign login system",
			description: "own your identity.. no emails/passwords/databases.. open-source.. privacy-focused..",
		})}
	`
}

