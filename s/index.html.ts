
import "@benev/slate/x/node.js"
import {template, html, easypage, headScripts, git_commit_hash, read_file, read_json, unsanitized, renderSocialCard} from "@benev/turtle"

import lockIcon from "./common/icons/tabler/lock.icon.js"

const domain = "authlocal.org"
const favicon = "/assets/favicon.png"
const version = (await read_json("package.json")).version

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()
	const faviconVersioned = await path.version.root(favicon)

	return easypage({
		path,
		dark: true,
		title: "Authlocal",
		head: html`
			<link rel="icon" href="${faviconVersioned}"/>
			<style>${unsanitized(await read_file("x/authority/main.css"))}</style>
			<meta data-commit-hash="${hash}"/>
			<meta data-version="${version}"/>

			${renderSocialCard({
				themeColor: "#77ff81",
				siteName: domain,
				title: "Authlocal – user-sovereign login system",
				description: "Own your identity. No emails, no passwords, no databases. Open-source. Privacy-focused.",
				image: `https://${domain}${favicon}`,
				url: `https://${domain}/`,
			})}

			${headScripts({
				devModulePath: await path.version.local("authority/main.bundle.js"),
				prodModulePath: await path.version.local("authority/main.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
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
				<p>Learn more on <a href="https://github.com/authlocal/authlocal/blob/main/GUIDE.md" target=_blank>GitHub</a>.</p>
				<p class=persistence><auth-persistence></auth-persistence></p>
				<p class=version>v${version}</p>
			</footer>
		`,
	})
})

