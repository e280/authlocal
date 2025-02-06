
import {Badge} from "@benev/slate"
import {IdView} from "./view.js"

export const renderThumbprint = (thumbprint: string) => {
	const badge = Badge.fromHex(thumbprint)
	return IdView([badge.string, badge.preview])
}

