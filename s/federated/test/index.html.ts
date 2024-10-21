
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

			<style>
				${unsanitized(await read_file("x/manager/manager.css"))}
				${unsanitized(await read_file("x/login/test/test.css"))}
			</style>

			<meta data-commit-hash="${hash}"/>

			${headScripts({
				devModulePath: await path.version.root("login/test/test.bundle.js"),
				prodModulePath: await path.version.root("login/test/test.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<h1 class=title>
				Apptest for Authduo
			</h1>
			<authduo-login></authduo-login>
			<footer>
				<p>This page is for testing purposes.</p>
			</footer>
		`,
	})
})

