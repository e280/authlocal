
import {template, html, socialCard} from "@e280/scute"

export default template(import.meta.url, async orb => html`
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="darkreader-lock"/>
			<style>@layer base{html{background:#000}}</style>

			<title>authlocal</title>
			<link rel="icon" href="/assets/favicon.png"/>
			<script type="module" src="${orb.hashurl("authority/main.bundle.min.js")}"></script>
			<style data-theme>${orb.inject("authority/styles/layers.css")}</style>
			<style data-theme>${orb.inject("authority/styles/vars.css")}</style>
			<style data-theme>${orb.inject("authority/styles/base.css")}</style>
			<style>${orb.inject("authority/styles/page.css")}</style>

			${socialCard({
				themeColor: "#77ff81",
				siteName: "authlocal.org",
				title: "authlocal – user-sovereign login system",
				description: "own your identity.. no emails/passwords/databases.. open-source.. privacy-focused..",
				image: `https://authlocal.org/assets/favicon.png`,
			})}
		</head>
		<body>
			<header>
				<h1>authlocal</h1>
				<small>own your identity. open-source. privacy-focused. user-sovereign.</small>
			</header>
			<main></main>
			<footer>
				<p>learn more on <a href="https://github.com/e280/authlocal#readme">github.</a></p>
				<small class=version>v${orb.packageVersion()}</small>
			</footer>
		</body>
	</html>
`)

