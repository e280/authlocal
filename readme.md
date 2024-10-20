
# 🛡️ [Authduo.org](https://authduo.org/)

*Authduo makes it free and easy for you to setup user logins onto your website or web app.*

🥞 **Easy as pancakes** – paste in a tiny amount of code to get auth for free  
🔑 **Passwordless** – users have cryptographic identity keypairs  
🦸 **User-sovereign** – users can download their keys and take them anywhere  
🥷 **Privacy-focused** – user can be anonymous: no emails, phone numbers, or tracking  
📱 **Clientside** – no api servers, 100% statically hosted on github pages  
🏛️ **Federated** – get access tokens from the authduo.org popup flow  
🌐 **Decentralized** – fork and self-host if you'd rather  
📜 **Protocol** – permissionless integration, you can do it your way  
💖 **Free and open source** – zero cost at worldwide scale  

> ***Pre-release warning***  
> Authduo is an unfinished and unstable prototype, use at your own risk.  

<br/>

## 😎 Easy HTML Installation

*Choose this installation method if you don't know any better.*

1. **Insert this in your `<head>`:**
    ```html
    <script type="module" src="https://authduo.org/install.js"></script>

    <script type="module">
      document.querySelector("auth-login").auth.onChange(login => {
        if (login) console.log("logged in", login)
        else console.log("logged out")
      })
    </script>
    ```
    - customize that second script to handle logins/logouts your way
    - when the user logs in, the `login` object looks like this:
      ```js
      login.name // Kaylim Bojrumaj
      login.thumbprint // "4e77bccf..."
      login.expiresAt // 1729381451374
      login.token // <raw data that can be crypto-verified>
      ```
    - when the user logs out, `login` is `null`
1. **Put this button in your `<body>`:**
    ```html
    <auth-login></auth-login>
    ```
    - this provides a nice little status/button ui for users to login or logout
1. 🎉 **You're done!**
    - Do whatever you want with that `login` object.
    - Display `login.name` in your UI.
    - Use the `login.thumbprint` as a unique user ID.
    - If you're getting advanced, you can send the `login.token` to your api server and verify it there.

<br/>

## 🧐 Sophisticated Authduo Installation

*Choose this installation method if you're familiar with npm, package.json, and typescript.*

1. **Install the npm package into your package.json**
    ```sh
    npm i @authduo/authduo
    ```
1. **Register the web components.** `main.ts`
    ```ts
    import {register_to_dom, components} from "@authduo/authduo"

    register_to_dom(components)
    ```
1. **Listen for auth changes.** `main.ts`
    ```ts
    import {auth} from "@authduo/authduo"

    auth.onChange(login => {
      if (login) console.log("logged in", login)
      else console.log("logged out")
    })
    ```
1. **Place some login buttons.** `index.html`
    ```html
    <auth-login></auth-login>
    ```

<br/>

## 🗽 Free Auth for Everybody at https://authduo.org/

### [Authduo.org](https://authduo.org/) is an identity management app for users
- It's a place where users can create, edit, delete, export, and import their identities
- Identities are cryptographic keypairs stored locally in the user's browser
- Users can export identities for backup or importing on other devices
- Everything is local: no servers store any user info
- Zero-cost for you and your users

### [Authduo.org](https://authduo.org/) provides federated logins for your apps
- The identities a user keeps on *authduo.org* can be used to login to any third party app that integrates *authduo.org*
- On your app, the login button opens an *authduo.org* popup for users to select/create an identity
- Your app gets back an access token via postmessage — boom, they're logged in
- Your app never touches the user's cryptographic keys, keeping things secure
- Your own API microservices can verify the acecss tokens cryptographically
- Zero-cost for you and your users

### [Authduo.org](https://authduo.org/) is for convenience, not vendor lock-in!
- You can fork Authduo to make your own identity management app, and users can take their identity files there instead
- You can point the login button to your own fork:
  ```html
  <auth-login src="https://authduo.org/"></auth-login>
  ```
  - Just swap `https://authduo.org/` with your own url
  - This is what "decentralized", "user-soveriegn", and "protocol" is all about

<br/>

## 🌠 The More You Know

### How can users login across multiple devices?
- Users can export identity files from one device, and import them onto another

### What if users lose their keys?
- Lose your keys, lose your account
- Okay, that is too hardcore for casual users — so let's build some softer opt-in services for users

### Opt-in services for casual user experience
- Authduo's core must stay hardcore and simple to enable user-sovereignty and privacy
- We can build *optional* services, so users can trade some sovereignty for some conveniences:
  - Username and password logins
  - Email-based recovery
  - OTP/QR codes to easily transfer identities across devices
  - Two-factor auth

### What if users share their identity files with friends or the public?
- Same problem as users sharing passwords. Different services, different strategies:
  - Multiplayer game servers can simply reject simultaneous logins with the same identity
  - Ecommerce servers can tie digital property to an email, and use email recovery to reassign ownership identities

### Authduo is just built different
- You lose control of *authentication*, that's in the user's hands now
- But you still control the *authorization* for your services
- If a user loses their identity, you can make any mechanism you want to reauthorize their services to a new identity

<br/>

## 🔨 More advanced integration examples

- **Programmatically trigger a login.** `main.js`
  ```js
  import {auth} from "@authduo/authduo"

  myButton.onclick = async() => {
    const login = await auth.login("https://authduo.org/")
    if (login) console.log("logged in", login)
  }
  ```
- **Do stuff on your own servers.**
  - send the login token to your serverside. `main.js`
    ```js
    await sendToMyServer(login.token)
    ```
  - receive and verify it cryptographically on your server. `server.js`
    ```js
    import {verify} from "@authduo/authduo"

    myServerReceive(async token => {
      const login = await verify(token)
      if (login) console.log("verified", login)
      else console.error("invalid token", token)
    })
    ```

<br/>

## 💖 Authduo is free and open source
- I built Authduo because I wanted free user-centric auth for my apps.
- Got questions or feedback? don't hesitate to open a github issue or discussion anytime.
- My name is Chase Moskal, ping me on discord: https://discord.gg/BnZx2utdev

