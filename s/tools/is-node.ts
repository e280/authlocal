
export function isNode() {
	return (
		typeof process !== "undefined" &&
		process.versions &&
		process.versions.node
	)
}

