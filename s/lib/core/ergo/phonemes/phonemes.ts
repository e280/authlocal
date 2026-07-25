
export class Phonemes extends Map<number, string> {
	index: Map<string, number>

	constructor(array: string[]) {
		super(array.entries())

		this.index = new Map(
			[...array.entries()]
				.map(([index, phoneme]) => [phoneme, index])
		)
	}
}

