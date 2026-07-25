
import {template, html} from "@e280/scute"
import {pageHead} from "./authority/ssg/page-head.js"

export default template(import.meta.url, async orb => html`
	<!doctype html>
	<html>
		<head>
			${pageHead(orb, "authlocal")}
			<script type="module" src="${orb.hashurl("authority/main.bundle.min.js")}"></script>
		</head>
		<body>
			<header>
				<h1>authlocal</h1>
			</header>

			<app-main></app-main>

			<footer>
				<hr/>
				<p>own your identity. device-local. open-source.</p>
				<p>learn more on <a href="https://github.com/e280/authlocal#readme">github.</a></p>
				<p class=version>v${orb.packageVersion()}</p>
			</footer>
		</body>
	</html>
`)

