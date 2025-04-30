
import "@benev/slate/x/node.js"
import {template, html, easypage, headScripts, git_commit_hash, read_file, read_json, unsanitized, renderSocialCard} from "@benev/turtle"

import lockIcon from "./common/icons/tabler/lock.icon.js"

const domain = "authlocal.org"
const favicon = "/assets/favicon.png"
const version = (await read_json("package.json")).version

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
			<meta data-version="${version}"/>

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
			<header>
				<div>
					<h1>
						${html(lockIcon.strings)}
						<span class=title>Authlocal.org</span>
						<span class=version>v${version}</span>
					</h1>
					<p>No emails, no passwords, no databases</p>
				</div>
				<div>
					<p><strong>User-sovereign login system</strong></p>
					<p>Own your identity, privacy-focused, open-source</p>
				</div>
			</header>

			<auth-manager></auth-manager>

			<footer>
				<div>
					<p>Learn more on <a href="https://github.com/authlocal/authlocal" target=_blank>GitHub</a></p>
					<auth-safe-storage></auth-safe-storage>
				</div>
			</footer>
		`,
	})
})

