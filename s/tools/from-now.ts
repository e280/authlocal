
export const Future = {
	seconds: (n: number) => Date.now() + (n * 1000),
	minutes: (n: number) => Date.now() + (n * Future.seconds(60)),
	hours: (n: number) => Date.now() + (n * Future.minutes(60)),
	days: (n: number) => Date.now() + (n * Future.hours(24)),
}

