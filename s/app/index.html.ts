
import {html, template} from "@e280/scute"
import {pageHead} from "../authority/ssg/page-head.js"

export default template(import.meta.url, async orb => html`
	<!doctype html>
	<html>
		<head>
			${pageHead(orb, "authlocal demo")}
			<script type="module" src="${orb.hashurl("app.bundle.min.js")}"></script>
		</head>
		<body>
			<h1>authlocal demo</h1>
			<button>login</button>
		</body>
	</html>
`)

