
export function randomDigits(count: number) {
	const digits = [..."1234567890"]
	const array: string[] = []
	for (const _ of Array(count)) {
		const index = Math.floor(Math.random() * digits.length)
		array.push(digits.at(index)!)
	}
	return array.join("")
}

