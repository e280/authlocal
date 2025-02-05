
import {IdView} from "./view.js"
import {Badge} from "../../../auth/utils/badge.js"

export const renderThumbprint = (thumbprint: string) => {
	const badge = Badge.fromThumbprint(thumbprint)
	return IdView([badge.string, badge.preview])
}

