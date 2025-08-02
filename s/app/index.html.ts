
import {ssg, html} from "@e280/scute"

const domain = "authlocal.org"
const favicon = "/assets/favicon.png"

export default ssg.page(import.meta.url, async _orb => ({
	title: "Authlocal App Demo",

	js: "demo.bundle.min.js",
	css: "demo.css",
	dark: true,
	favicon,

	socialCard: {
		themeColor: "#77ff81",
		siteName: domain,
		title: "Authlocal – demo page",
		description: "Open source login system. Example integration.",
		image: `https://${domain}${favicon}`,
		url: `https://${domain}/app/`,
	},

	body: html`
		<h1>Example app using Authlocal</h1>
		<p>This page is a test for a typical federated auth integration with <a href="/">Authlocal</a></p>
		<auth-button src="/"></auth-button>
		<auth-user></auth-user>
	`,
}))

