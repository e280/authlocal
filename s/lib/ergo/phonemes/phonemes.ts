
import {GMap} from "@e280/stz"

export class Phonemes extends GMap<number, string> {
	index: GMap<string, number>

	constructor(array: string[]) {
		super(array.entries())

		this.index = new GMap(
			[...array.entries()]
				.map(([index, phoneme]) => [phoneme, index])
		)
	}
}

