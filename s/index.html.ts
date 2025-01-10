
import "@benev/slate/x/node.js"
import shieldLockIcon from "./common/icons/tabler/shield-lock.icon.js"
import {template, html, easypage, headScripts, git_commit_hash, read_file, unsanitized, renderSocialCard} from "@benev/turtle"

const domain = "authlocal.org"
const favicon = "/assets/favicon.png"

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()

	return easypage({
		path,
		dark: true,
		title: "Authlocal.org",
		head: html`
			<link rel="icon" href="${favicon}"/>
			<style>${unsanitized(await read_file("x/manager/index.css"))}</style>
			<meta data-commit-hash="${hash}"/>

			${renderSocialCard({
				themeColor: "#8800ff",
				siteName: "authlocal.org",
				title: "Authlocal.org – login passports",
				description: "Own your identity. No emails, no passwords, no databases. User-sovereign, privacy-focused, open-source.",
				image: `https://${domain}${favicon}`,
				url: `https://${domain}/`,
			})}

			${headScripts({
				devModulePath: await path.version.root("manager/index.bundle.js"),
				prodModulePath: await path.version.root("manager/index.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<h1 class=title>
				${html(shieldLockIcon.strings)}
				<span>Authlocal.org</span>
			</h1>

			<auth-manager></auth-manager>

			<footer>
				<p>User-sovereign, privacy-focused, open-source.</p>
				<p>No emails, no passwords, no databases.</p>
				<p>Learn more on <a href="https://github.com/authlocal/authlocal" target=_blank>GitHub</a>.</p>
				<auth-safe-storage></auth-safe-storage>
			</footer>
		`,
	})
})

