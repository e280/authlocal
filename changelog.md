
# `@authduo/authduo` changelog

- 🟥 *harmful -- breaking change*
- 🔶 *maybe harmful -- deprecation, or possible breaking change*
- 🍏 *harmless -- addition, fix, or enhancement*

<br/>

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

