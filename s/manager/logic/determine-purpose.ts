
import {Purpose} from "./purpose.js"

export function determinePurpose(): Purpose.Any {
	const loginRequested = location.search.includes("login") || window.opener

	if (loginRequested)
		return {
			kind: "login",
			onLogin: async id => {
				const day = (1000 * 60 * 60 * 24)
				const token = await id.signAccessToken({
					audience: window.origin,
					expiry: Date.now() + (1 * day),
				})
				window.opener.postMessage({token}, window.opener.origin)
			},
		}
	else
		return {
			kind: "manage",
		}
}

