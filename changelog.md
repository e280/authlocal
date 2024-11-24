
# `@authduo/authduo` changelog

- 🟥 *harmful -- breaking change*
- 🔶 *maybe harmful -- deprecation, or possible breaking change*
- 🍏 *harmless -- addition, fix, or enhancement*

<br/>

## v0.2

### v0.2.0
- 🧐 authduo doesn't have any users yet so i'm still in a mode of breaking things with impunity
- 🟥 delete `<auth-login>` and replace it with `<auth-button>` and `<auth-user>`
- 🟥 renamed a bunch of token types, like `Header` is now `TokenHeader`
- 🟥 `decode` static methods now return the raw WebToken `{header, payload, signature}` object
- 🟥 tokens reworked, we now have `Keys`, `Proof`, and `Claim` tokens
- 🟥 auth.login has a new Login type with a somewhat different signature
- 🟥 breaking changes to the fed api (api between the popup and your app)
  - all calls are now namespaced under v1
  - this will make it easier to avoid breaking changes in the future
  - i also changed the names of the LoginTokens that get returned
- 🟥 moved the passport's `name` from Keys to Proof
- 🔶 tweaked authfile format, but its versioned and so should not cause breakage
- 🍏 renamed `JsonWebToken` facility to simply `Token`
- 🍏 on the passport edit page, i added a text input for copying the thumbprint

## v0.1

### v0.1.0
- 🟥 tokens rewrite
  - introducing `Login`, `Proof`, and `Challenge` tokens
  - each login now contains an ephemeral keypair relevant to that specific login
  - logins are now capable of signing arbitrary challenge data on behalf of the passport
  - each successful login comes with a proof, which is used to verify all logins and challenges
  - so, now, it's recommended that apps should use `login.signChallengeToken` to produce their own access tokens
- 🟥 auth storage mechanisms rewritten
  - auth data is now stored in localstorage under key `authduo`
- 🍏 new package.json `exports` mapping
  - should mean node and deno can just import from `@authduo/authduo` and it'll work

<br/>

## v0.0

### v0.0.3
- 🔶 add: required param `issuer` to `passport.signLoginToken(params)`
- 🍏 fix: bug with cross-domain logins
- 🍏 add: login token verification options `allowedAudiences` and `allowIssuers`

### v0.0.2
- 🍏 fix: the login signal firing in a loop

### v0.0.1
- 🔶 deprecate: `passport.signAccessToken`, use `passport.signLoginToken` instead
- 🍏 fix: nodejs and deno compat for auth functions
- 🍏 add: test suite for auth functionality on nodejs

### v0.0.0
- initial release

