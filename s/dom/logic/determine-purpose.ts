
import {Purpose} from "./purpose.js"

export function determinePurpose(): Purpose.Any {
	const loginRequested = location.search.includes("login") || window.opener

	if (loginRequested) {
		return {
			kind: "login",
			onLogin: id => console.log("LOGIN!", id.thumbprint),
		}
	}
	else {
		return {
			kind: "manage",
		}
	}
}

