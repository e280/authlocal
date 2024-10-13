
export function validName(name: string) {
	return (
		typeof name === "string" &&
		name.length >= 1 &&
		name.length <= 24 &&

		// allowing all ordinary characters
		/^[\p{L}\p{N}\p{P}\p{S}\p{Zs}]+$/u.test(name) &&

		// disallow control/invisible characters
		!/[\p{C}]/u.test(name) &&

		// disallow leading/trailing whitespace
		!/^\s|\s$/u.test(name)
	)
}

