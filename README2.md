
# Authlocal developer docs
- Learn more about Authlocal: [GUIDE.md](GUIDE.md)

<br/>

## Authlocal integration

This will allow users to login to your website using the Authlocal federated popup flow.

### Pick one of these install techniques
- **(A) HTML install technique**
    1. Put this script in your html `<head>`:
      ```html
      <script type="module">
        import Auth from "https://authlocal.org/install.bundle.min.js"
        import theme from "https://authlocal.org/themes/e280.css.js"

        const auth = await Auth.install({theme})

        // Handle user logins and logouts
        auth.on(login => {
          if (login) console.log("login", login.label)
          else console.log("logout")
        })
      </script>
      ```
- **(B) Webdev install technique**
    1. Install the package into your npm project:
      ```sh
      npm install @authlocal/authlocal
      ```
    1. Write this in your `main.ts` or whatever:
      ```ts
      import Auth from "@authlocal/authlocal"
      import theme from "@authlocal/authlocal/x/themes/e280.css.js"

      const auth = await Auth.install({theme})

      // Handle user logins and logouts
      auth.on(login => {
        if (login) console.log("login", login.label)
        else console.log("logout")
      })
      ```

### Use the HTML elements on your page
1. Stick these anywhere in your html `<body>`:
  ```html
  <auth-user></auth-user>
  <auth-button></auth-button>
  ```

### CSS themes *(optional)*
- See that `e280.css.js` theme in the install snippet? You can swap it out!
  - `basic.css.js` — simple high-contrast theme
  - `e280.css.js` — neon buildercore aesthetic
- You can actually omit the theme, and it will look all browser-defaulty and ugly
  ```ts
  const auth = await Auth.install()
  ```
- If you must, you can put on your mud boots and write your own custom css like this:
  ```ts
  import {Auth, css} from "@authlocal/authlocal"
  import theme from "@authlocal/authlocal/x/themes/basic.css.js"

  const auth = await Auth.install({theme: css`

    /* You can extend one of the preset themes */
    ${theme}

    /* Just write your own CSS as you wish */
    button { color: red; }
  `})
  ```

### Anatomy of a `login`
- `login.id` — unique id for a user
  - looks like `"a08263e70a0a48a07e988a7c0931ada6b0a38fa84bf367087b810c614a4c2070"`
  - *(it's actually the user identity public key)*
- `login.label` — user's chosen nickname
  - looks like `"Michael Scott"`

<br/>

## Authlocal claims

Okay, so you have a user's `login`. Now what?
- The purpose of a login is to *sign claims* on the user's behalf.
- You must *never* send the login data anywhere. It should stay on the user's clientside device.
- The login is automatically persisted in `localStorage`.

The purpose of a claim is to say *"on behalf of this user, my frontend says..."*
- "...they want to post this message"
- "...they want to change their avatar"
- "...they want to buy this microtransaction"

Claims are secured cryptographically.
- Claims contain cryptographic proof that they stem from a user's login.
- No attacker can spoof a claim for somebody else's identity.

### Sign a claim
```js
import {future} from "@authlocal/authlocal"

const claimToken = await login.signClaim({

  // any json-friendly data you want
  claim: {message: "i love ice cream"},

  // when should this claim expire?
  expiresAt: future.hours(24),
})
```

### Verify a claim
```js
import {verifyClaim} from "@authlocal/authlocal"

const {claim, proof} = await verifyClaim({
  claimToken,
  appOrigins: ["https://example.e280.org"],
})

proof.sessionId
  // id for this login session, looks like:
  // "ff730fe2d725aa5210152975212d1068d7fe28ae22b5e62337a4cde42215187a"

proof.nametag.id
  // user identity id, looks like:
  // "a08263e70a0a48a07e988a7c0931ada6b0a38fa84bf367087b810c614a4c2070"

proof.nametag.label
  // user identity nickname, looks like:
  // "Michael Scott"
```
- You can verify claims on the clientside or serverside.
- You must specify what `appOrigins` you expect to receive claims from (this prevents phishing attacks).

