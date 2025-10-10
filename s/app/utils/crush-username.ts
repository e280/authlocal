
import {maxLabelLength} from "./validation.js"

/** convert a username into a string that is url friendly and filename friendly */
export function crushUsername(username: string, maxLength = maxLabelLength): string {
	const sanitized = username
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, maxLength)
	return sanitized || "identity"
}

