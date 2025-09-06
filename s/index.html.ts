
import {ssg, html} from "@e280/scute"
import lockIcon from "./common/icons/tabler/lock.icon.js"

const domain = "authlocal.org"
const favicon = "/assets/favicon.png"

export default ssg.page(import.meta.url, async orb => ({
	title: "Authlocal",

	js: "authority/main.bundle.min.js",
	css: "authority/main.css",
	dark: true,
	favicon,
	head: html`
		<meta data-version="${orb.packageVersion()}"/>
	`,

	socialCard: {
		themeColor: "#77ff81",
		siteName: domain,
		title: "Authlocal – user-sovereign login system",
		description: "Own your identity. No emails, no passwords, no databases. Open-source. Privacy-focused.",
		image: `https://${domain}${favicon}`,
		url: `https://${domain}/`,
	},

	body: html`
		<header>
			<h1>
				${html(lockIcon.strings)}
				<span class=title>Authlocal</span>
			</h1>
		</header>

		<auth-manager></auth-manager>

		<footer>
			<p>Own your identity. Open-source. Privacy-focused. User-sovereign.</p>
			<p>Learn more on <a href="https://github.com/e280/authlocal#readme" target=_blank>GitHub</a>.</p>
			<p class=persistence><auth-persistence></auth-persistence></p>
			<p class=version>v${orb.packageVersion()}</p>
		</footer>
	`,
}))

