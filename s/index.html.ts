
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
				themeColor: "#77ff81",
				siteName: "authlocal.org",
				title: "Authlocal.org – user-sovereign login system",
				description: "Own your identity. No emails, no passwords, no databases. Privacy-focused, open-source.",
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
				<h1>
					${html(lockIcon.strings)}
					<span class=title>Authlocal<wbr/>.org</span>
				</h1>
				<p>
					<span>User-sovereign logins for all</span>
					<span class=version>– v${version}</span>
				</p>
			</header>

			<auth-manager></auth-manager>

			<footer>
				<p>Privacy-focused, free, open-source. Learn more on <a href="https://github.com/authlocal/authlocal" target=_blank>GitHub</a></p>
				<p>Own your identity.</p>
				<auth-safe-storage></auth-safe-storage>
			</footer>
		`,
	})
})

