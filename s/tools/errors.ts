
export async function distinguishOkAndErr<T>(promises: Promise<T>[]) {
	const settled = await Promise.allSettled(promises)
	return {

		ok: settled
			.filter(s => s.status === "fulfilled")
			.map(s => s.value),

		err: settled
			.filter(s => s.status === "rejected")
			.map(s => s.reason),
	}
}

export function problematize(error: any) {
	return (error instanceof Error)
		? `${error.name}: ${error.message}`
		: `invalid`
}

