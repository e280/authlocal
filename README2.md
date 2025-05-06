
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

### CSS themes *(optional)*

<br/>

## Authlocal claims

Okay, so you have a user's `login`. Now what?
- The login is automatically persisted in `localStorage`.
- You must *never* send the login data anywhere. It should stay on the user's clientside device.
- What the login is for, is *signing claims* on the user's behalf.
- When a user provides you with a `login`, they are consenting to your app signing claims on their behalf.
- Claims are scoped to your app's origin.

### Sign a claim
- On the clientside, you can use a user's login to sign a claim:
  ```js
  import {future} from "@authlocal/authlocal"

  const claimToken = await login.signClaim({
    claim: {message: "i love ice cream"},
    expiresAt: future.hours(24),
  })
  ```
- The claim can contain *any json-friendly data you want*
- The purpose of a claim is to say *"on behalf of this user, my frontend says..."*
  - "...they want to post this message"
  - "...they want to change their avatar"
  - "...they want to buy this microtransaction"
- Now your server can accept a claim token, and *verify* that it was indeed consented by the user's identity (and not some scammer sending you anonymous requests trying to change other people's avatars or whatever)
  - Said differently, no attacker can spoof a claim for another user whose secret key they do not own

### Verify a claim
  - On your serverside (or clientside, wherever really), you can verify a claim:
  ```js
  import {verifyClaim} from "@authlocal/authlocal"

  const {claim} = await verifyClaim({
    claimToken,
    appOrigins: ["https://example.e280.org"],
  })
  ```
  - `appOrigins` is an array of origins that you'll allow claims from








