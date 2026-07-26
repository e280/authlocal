
![](https://i.imgur.com/Of61sXO.png)

# 🔐 [authlocal](https://authlocal.org/) is a free user-sovereign login system.
any website can ask you to sign-in via authlocal. manage your identities any time at https://authlocal.org/  

&nbsp; 🔑 **cryptographic.** passwordless, usernameless, emailless.  
&nbsp; 🏡 **local-only.** keys are on your device (no cloud databases).  
&nbsp; 🗽 **user-sovereign.** copy and store your keys however you wish.  
&nbsp; 🥷 **privacy-focused.** pseudonymous, no personal information.  
&nbsp; 💖 **free and open-source.** zero-cost at global scale, can be self-hosted.  

**own your identity.**  
each identity you create has a permanent seed key. don't lose it. don't share it. it's yours, forever.

> *"keep it secret. keep it safe."*  
> &nbsp; &nbsp; *— gandalf, fellowship of the ring*



<br/><br/>

## 🔐 installation for web developers
> *visit https://authlocal.org/demo/ to see what the authlocal popup looks like.*

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
1. **log auth.user changes.** *(see [user.ts](./s/lib/protocol/user.ts))*
    ```ts
    effect(() => console.log(
      auth.user
        ? `logged in: ${auth.user.emoji} ${auth.user.address}`
        : `logged out`
    ))
    ```
1. **start by remembering a previous user session.**
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

### 🍋‍🟩 perform end-to-end encryption for the user
1. **encrypt data.**
    ```ts
    const ciphertext = auth.user.encrypt(
      new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF])
    )
    ```
1. **decrypt data.**
    ```ts
    const data = auth.user.decrypt(ciphertext)
    ```

### 🍋‍🟩 sign and verify testimonies on behalf of the user
1. **sign a testimony token.**
    ```ts
    const token = auth.user.signTestimony({
      data: {exampleCommandToWriteData: 123},
      audience: "https://server.e280.org", // your example server
      expiresAt: Date.now() + 600_000, // 10 minutes
    })
    ```
1. **verify a testimony token serverside or elsewhere.** *(note the import path)*
    ```ts
    import {verifyTestimony, address} from "@e280/authlocal/core"

    // data is verifiably signed by a delegate which is signed by the identity root key
    const testimony = verifyTestimony(token, {
      allowedIssuers: ["https://app.e280.org"], // your example frontend
      allowedAudiences: ["https://server.e280.org"], // your example server
    })

    if (testimony.yay) { // check if verification succeeded
      const {data, id} = testimony.value

      console.log(data.exampleCommandToWriteData)
        // 123

      console.log(id)
        // "cd967edd1a3a82e142faa5003eda67d167a2b5f76d0e97e8158defe59e2a2c89"

      console.log(address.from(testimony.value.id))
        // "volrad_welsyx_EqXgGh7SEyGzpbUiacCJ7BVpAP1kBePt6THiR8gSTtGx"
    }
    else console.error("testimony verification failed")
    ```

### 🍋‍🟩 what's really going on under the hood
- your site opens a popup to authlocal and asks for "delegates", which are signed by the user identity's root key. a delegate is a new keypair that comes with a "proof" token which proves that the delegate was signed by the user root. being a keypair in its own right, a delegate can then sign new "testimony" tokens on behalf of the user, which have a verifiable chain-of-custody back to the user root.
- in a standard login flow, your site asks for two delegates: one "login" delegate that expires in 30 days, and one permanent "encryption" delegate. the "login" delegate can be used to sign new testimonies for any data or request *(eg, "i am user abc123 and i want to write data to the server"),* which your server can verify is coming from a valid delegate.



<br/><br/>

*https://e280.org/*

