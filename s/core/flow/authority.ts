
//
// this file exports everything the *authority* app needs.
// the comments tell a linear story about the flow.
//

// we generate an identity for the user.
export {Identity} from "../core/identity/types.js"
export {generateIdentity} from "../core/identity/identity.js"

// the user can save their seed, or recover their identity from seed.
export {seedPack} from "../core/identity/seed.js"
export {seedRecover} from "../core/identity/seed.js"
export {dedupeIdentities} from "../core/identity/identity.js"

// when the user clicks "login", we generate a login session
export {Session} from "../core/session/types.js"
export {generateSession} from "../core/session/session.js"

