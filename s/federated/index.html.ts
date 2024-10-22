
import "@benev/slate/x/node.js"
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
			<style>${unsanitized(await read_file("x/manager/index.css"))}</style>
			<style>${unsanitized(await read_file("x/federated/index.css"))}</style>

			<meta data-commit-hash="${hash}"/>

			${headScripts({
				devModulePath: await path.version.root("install.bundle.js"),
				prodModulePath: await path.version.root("install.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<h1 class=title>
				Authduo Integration Test
			</h1>
			<auth-login src="/"></auth-login>
			<footer>
				<p>This page is for testing a typical Authduo integration for federated logins.</p>
			</footer>
		`,
	})
})

