
![](https://i.imgur.com/Of61sXO.png)

# 🔐 [authlocal](https://authlocal.org/) is a free login system.
any website can ask for you to sign-in via authlocal. manage your identities any time at https://authlocal.org/  

&nbsp; 🔑 **cryptographic.** passwordless, usernameless, emailless.  
&nbsp; 🏡 **local-only.** keys stay on your device (no cloud databases).  
&nbsp; 🗽 **user-sovereign.** copy and store your keys however you wish.  
&nbsp; 🥷 **privacy-focused.** pseudonymous. no personal information.  
&nbsp; 💖 **free and open-source.** zero-cost at global scale, and can be self-hosted.  

**own your identity.**  
each identity you create has a permanent seed key. don't lose it. don't share it. it's yours, forever.

> *"keep it secret. keep it safe."*  
> &nbsp; &nbsp; *— gandalf, fellowship of the ring*



<br/><br/>

## 🔐 installation for web developers
> *visit https://authlocal.org/demo/ to see what the authlocal popup looks like.*

your site opens a popup to authlocal and asks for "delegates", which are signed by the user identity's root secret key. a delegate is new keypair that comes with a "proof" token which proves that the delegate was signed by the user root. being a keypair in its own right, a delegate can then sign new "testimony" tokens on behalf of the user, which have a verifiable chain-of-custody back to the user root.

in a standard login flow, your site asks for two delegates: one for "login" that expires in 30 days, and a permanent one for "encryption". the "login" delegate can be used to sign new testimonies for anything *(eg, "i am user 'abc123' and i want to write data to the server")* which your server can verify is coming from somebody who held that user root.

1. **install and import `@e280/authlocal`.** *(and `@e280/strata` for this demo)*
    ```bash
    npm install @e280/authlocal @e280/strata
    ```
    ```ts
    import {Auth} from "@e280/authlocal"
    import {effect} from "@e280/strata"
    ```
1. **create the auth facility.** *(see [auth.ts](./s/lib/protocol/auth.ts))*
    ```ts
    const auth = new Auth()
    ```
1. **log session changes.** *(see [session.ts](./s/lib/protocol/session.ts))*
    ```ts
    effect(() => console.log(
      auth.session
        ? `logged in: ${auth.session.emoji} ${auth.session.address}`
        : `logged out`
    ))
    ```
1. **start by remembering a previous session.**
    ```ts
    await auth.remember()
    ```
1. **perform a login flow with authlocal.** *(must be in [user action](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/User_actions) like a button click)*
    ```ts
    await auth.loginViaPopup()
    ```
1. **instantly logout.**
    ```ts
    await auth.logout()
    ```

