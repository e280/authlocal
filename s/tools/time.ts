
export const Time = {
	seconds: (n: number) => (n * 1000),
	minutes: (n: number) => (n * Time.seconds(60)),
	hours: (n: number) => (n * Time.minutes(60)),
	days: (n: number) => (n * Time.hours(24)),

	future: {
		seconds: (n: number) => (Date.now() + Time.seconds(n)),
		minutes: (n: number) => (Date.now() + Time.minutes(n)),
		hours: (n: number) => (Date.now() + Time.hours(n)),
		days: (n: number) => (Date.now() + Time.days(n)),
	},

	past: {
		seconds: (n: number) => (Date.now() - Time.seconds(n)),
		minutes: (n: number) => (Date.now() - Time.minutes(n)),
		hours: (n: number) => (Date.now() - Time.hours(n)),
		days: (n: number) => (Date.now() - Time.days(n)),
	},
}

