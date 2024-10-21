
import "@benev/slate/x/node.js"
import {svgTurtle} from "./tools/svg-turtle.js"
import shieldLockIcon from "./common/icons/tabler/shield-lock.icon.js"
import {template, html, easypage, headScripts, git_commit_hash, read_file, unsanitized} from "@benev/turtle"

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()

	return easypage({
		path,
		dark: true,
		title: "Authduo.org",
		head: html`
			<link rel="icon" href="/assets/favicon.png"/>
			<style>${unsanitized(await read_file("x/manager/index.css"))}</style>

			<meta data-commit-hash="${hash}"/>

			${headScripts({
				devModulePath: await path.version.root("manager/index.bundle.js"),
				prodModulePath: await path.version.root("manager/index.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<h1 class=title>
				${svgTurtle(shieldLockIcon)}
				<span>Authduo.org</span>
			</h1>

			<auth-manager></auth-manager>

			<footer>
				<p>Authduo powers logins without servers.</p>
				<p>Clientside decentralized user-sovereign federated auth. Free and open source.</p>
				<p>See Authduo on <a href="https://github.com/authduo/authduo" target=_blank>GitHub</a> to learn more.</p>
				<p>Own your identity.</p>
			</footer>
		`,
	})
})

