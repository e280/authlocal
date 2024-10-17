
export function validName(name: string): boolean {
	if (name !== name.trim())
		return false

	const spaceless = name.replaceAll(" ", "")

	return [
		typeof name === "string",
		name.length >= 1,
		name.length <= 24,

		// no consecutive spaces
		!/[ ]{2,}/u.test(name),

		// no whitespace except ordinary spaces
		!/\s/.test(spaceless),

		// no control chars
		!/\p{Z}\p{C}/u.test(spaceless),
	].every(v => v)
}

