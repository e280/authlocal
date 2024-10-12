
export function templateString(strings: TemplateStringsArray, ...values: any[]) {
	const lastIndex = strings.length - 1
	return strings
		.slice(0, lastIndex)
		.reduce((a, b, c) => a + b + values[c], "")
			+ strings[lastIndex]
}

