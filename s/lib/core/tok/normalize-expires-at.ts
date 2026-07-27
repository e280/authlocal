
import {time} from "@e280/stz"
import {consts} from "../../../consts.js"

export function normalizeExpiresAt(expiresAt: unknown, atTime: number) {
	const fallback = atTime + time.days(consts.standardExpiryDays)

	const valid = (
		typeof expiresAt === "number" &&
		Number.isFinite(expiresAt) &&
		expiresAt > atTime
	)

	return valid
		? expiresAt
		: fallback
}

