
import {Badge} from "@e280/stz"
import {IdView} from "./view.js"
import {idPreview} from "../../../index.core.js"

export const renderThumbprint = (thumbprint: string) => {
	const badge = Badge.fromHex(thumbprint)
	const preview = idPreview(thumbprint)
	return IdView([badge, preview])
}

