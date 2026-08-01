
import {html, template} from "@e280/scute"
import {pageHead} from "../delegator/ssg/page-head.js"

export default template(import.meta.url, async orb => html`
	<!doctype html>
	<html>
		<head>
			${pageHead(orb, "authlocal demo")}
			<script type="module" src="${orb.hashurl("demo.bundle.min.js")}"></script>
			<style>
				body {
					display: flex;
					flex-direction: column;
					gap: 1em;
				}
			</style>
		</head>
		<body>
			<h1>authlocal demo</h1>
			<auth-widget></auth-widget>
		</body>
	</html>
`)

