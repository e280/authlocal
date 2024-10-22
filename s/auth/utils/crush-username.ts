
/** convert a username into a string that is url friendly and filename friendly */
export function crushUsername(username: string, maxLength = 24): string {
	const sanitized = username
		.toLowerCase()
		.replace(/[^a-z0-9]/gi, "_")
		.slice(0, maxLength)
		.replace(/^_+|_+$/g, "")
	return sanitized || "identity"
}

