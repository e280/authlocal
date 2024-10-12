
import "@benev/slate/x/node.js"
import shieldLockSvg from "./dom/icons/tabler/shield-lock.svg.js"
import {template, html, easypage, headScripts, git_commit_hash, read_file} from "@benev/turtle"

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()

	return easypage({
		path,
		dark: true,
		css: "index.css",
		title: "Authduo",
		head: html`
			<link rel="icon" href="/assets/graphics/favicon.png"/>
			<link rel="stylesheet" href="${path.version.root("index.css")}"/>

			<meta data-commit-hash="${hash}"/>

			${headScripts({
				devModulePath: await path.version.root("index.bundle.js"),
				prodModulePath: await path.version.root("index.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<h1 class=title>
				${shieldLockSvg.turtle()}
				<span>Authduo</span>
			</h1>
			<auth-app></auth-app>
		`,
	})
})

