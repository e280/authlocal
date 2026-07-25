
import {html, template} from "@e280/scute"
import {pageHead} from "../delegator/ssg/page-head.js"

export default template(import.meta.url, async orb => html`
	<!doctype html>
	<html>
		<head>
			${pageHead(orb, "authlocal demo")}
			<script type="module" src="${orb.hashurl("demo.bundle.min.js")}"></script>
		</head>
		<body>
			<h1>authlocal demo</h1>
			<button class=login>login</button>
			<button class=logout>logout</button>
			<p class=session>--</p>
		</body>
	</html>
`)

