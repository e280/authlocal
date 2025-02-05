
import {Base58, Hex, Urname} from "@benev/slate"

/**
 * Badge is a human-friendly presentation format for arbitrary binary data.
 *  - looks like "nomluc-rigpem.tg2bjNkjMh1H6M2b2EhD5V4x6XAqx9wyWddsBt"
 *  - has an urname prefix 'preview'
 *  - the rest of the data is in base58
 *  - designed to be a nice way to present 256-bit passport thumbprints
 *  - can be used for data of different lengths
 *  - preview size can be customized as 'leadCount', which defaults to 4
 */
export class Badge {
	static readonly defaultLeadCount = 4
	readonly hex: string
	readonly string: string
	readonly preview: string

	constructor(
			public readonly bytes: Uint8Array,
			public readonly leadCount = Badge.defaultLeadCount,
		) {
		if (leadCount < 1)
			throw new Error(`badge leadCount must be greater than 0 (was ${leadCount})`)
		this.hex = Hex.string(this.bytes)
		this.preview = Urname.string(this.bytes.slice(0, leadCount))
		this.string = (bytes.length > leadCount)
			? `${this.preview}.${Base58.string(this.bytes.slice(leadCount))}`
			: this.preview
	}

	static parse(badge: string) {
		const [urname, b58] = badge.split(".")

		// badge is separated by a "."
		if (b58) {
			const appetizer = Urname.bytes(urname)
			const entree = Base58.bytes(b58)
			const bytes = new Uint8Array([...appetizer, ...entree])
			return new this(bytes, appetizer.length)
		}

		// badge has no dot, and is all urname preview, no base58 part
		else {
			const bytes = Urname.bytes(urname)
			return new this(bytes, bytes.length)
		}
	}

	static fromHex(hex: string, leadCount = this.defaultLeadCount) {
		const bytes = Hex.bytes(hex)
		return new this(bytes, leadCount)
	}

	toString() {
		return this.string
	}
}

