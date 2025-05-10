
import "@benev/slate/x/node.js"
import {template, html, easypage, headScripts, git_commit_hash, read_file, unsanitized} from "@benev/turtle"

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()

	return easypage({
		path,
		dark: true,
		title: "Authlocal Federated Test",
		head: html`
			<link rel="icon" href="/assets/favicon.png"/>
			<style>${unsanitized(await read_file("x/federated/demo.css"))}</style>
			<style>${unsanitized(await read_file("x/themes/basic.css"))}</style>
			<meta data-commit-hash="${hash}"/>

			${headScripts({
				devModulePath: await path.version.local("demo.bundle.js"),
				prodModulePath: await path.version.local("demo.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<h1>Example app using Authlocal</h1>
			<p>This page is a test for a typical federated auth integration with <a href="/">Authlocal</a></p>
			<auth-sigil hex="c9185ef07bc9f24ca856f2a178e59f85d0d53d22a14b26b434b58a22c9a872fb"></auth-sigil>
			<auth-button src="/"></auth-button>
			<auth-user></auth-user>
		`,
	})
})

