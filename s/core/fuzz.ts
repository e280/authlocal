
export function fuzz({time, randomness, additive}: {
		time: number
		randomness: number
		additive: boolean
	}) {

	const resolution = randomness / 10
	
	const bucketed = Math.floor(
		additive
			? Math.ceil(time / resolution) * resolution
			: Math.floor(time / resolution) * resolution
	)

	const offset = Math.floor(Math.random() * randomness)

	return additive
		? bucketed + offset
		: bucketed - offset
}

