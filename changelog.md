
# `@authduo/authduo` changelog

- 🟥 *harmful -- breaking change*
- 🔶 *maybe harmful -- deprecation, or possible breaking change*
- 🍏 *harmless -- addition, fix, or enhancement*

<br/>

--------

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

