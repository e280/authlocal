
export class FromNow {
	static seconds = (n: number) => Date.now() + (n * 1000)
	static minutes = (n: number) => Date.now() + (n * this.seconds(60))
	static hours = (n: number) => Date.now() + (n * this.minutes(60))
	static days = (n: number) => Date.now() + (n * this.hours(24))
}

