
import "@benev/slate/x/node.js"
import {svgTurtle} from "./tools/svg-turtle.js"
import shieldLockIcon from "./dom/icons/tabler/shield-lock.icon.js"
import {template, html, easypage, headScripts, git_commit_hash, read_file, unsanitized} from "@benev/turtle"

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()

	return easypage({
		path,
		dark: true,
		title: "Apptest",
		head: html`
			<link rel="icon" href="/assets/favicon.png"/>

			<style>
				${unsanitized(await read_file("x/index.css"))}
			</style>

			<meta data-commit-hash="${hash}"/>

			${headScripts({
				devModulePath: await path.version.root("testing/apptest.bundle.js"),
				prodModulePath: await path.version.root("testing/apptest.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<h1 class=title>
				${svgTurtle(shieldLockIcon)}
				<span>Authduo.org</span>
			</h1>
			<footer>
				<p>This page is for testing purposes.</p>
			</footer>
		`,
	})
})

