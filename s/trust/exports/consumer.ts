
//
// this file exports everything the *consumer* app needs.
// the comments tell a linear story about the flow.
//

// we are connected to the authority via a postmessage api.
export {makeAppFns} from "../postmessage/app-fns.js"
export {setupInApp} from "../postmessage/setup-in-app.js"

// we receive a session from the authority via postmessage.
export {Session} from "../concepts/session/types.js"

// we verify the session as a login object.
export {Login} from "../concepts/session/login.js"

// we use the login object to sign claim tokens.
export {LoginSignClaimOptions} from "../concepts/session/types.js"
export {SignClaimOptions} from "../concepts/claim/types.js"

// we verify claim tokens, on our serverside or clientside.
export {verifyClaim} from "../concepts/claim/verify.js"
export {ClaimPayload as Claim} from "../concepts/claim/types.js"
export {VerifyClaimOptions} from "../concepts/claim/types.js"

