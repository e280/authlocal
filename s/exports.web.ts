
//
// functionality exposed to federated apps
//  - web browser support (not node/bun/deno etc)
//  - provides web components and such
//

export * from "./exports.core.js"

export {register, apply, mixin, css, CSSResultGroup} from "@benev/slate"

export * from "./federated/auth.js"
export {Auth as default} from "./federated/auth.js"

export * from "./federated/types.js"
export * from "./federated/elements/auth-user/element.js"
export * from "./federated/elements/auth-button/element.js"

export * from "./common/views/copyable/view.js"
export * from "./common/elements/auth-id/element.js"

