
export const FromNow = {
	seconds: (n: number) => Date.now() + (n * 1000),
	minutes: (n: number) => Date.now() + (n * FromNow.seconds(60)),
	hours: (n: number) => Date.now() + (n * FromNow.minutes(60)),
	days: (n: number) => Date.now() + (n * FromNow.hours(24)),
}

