
export const maxLabelLength = 32

export function validLabel(label: string): boolean {
	if (label !== label.trim())
		return false

	const spaceless = label.replaceAll(" ", "")

	return [
		typeof label === "string",
		label.length >= 1,
		label.length <= maxLabelLength,

		// no consecutive spaces
		!/[ ]{2,}/u.test(label),

		// no whitespace except ordinary spaces
		!/\s/.test(spaceless),

		// no control chars
		!/\p{Z}\p{C}/u.test(spaceless),
	].every(v => v)
}

