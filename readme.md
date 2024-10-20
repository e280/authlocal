
# 🛡️ [Authduo.org](https://authduo.org/)

***Free User-sovereign Authentication for the World.***

Authduo is a system that makes it easy for you to setup user logins onto your website or web app.

🥞 **Easy as pancakes** – paste in a tiny amount of code to get auth for free  
🥷 **Privacy-focused** – user anonymity; no emails, phone numbers, or tracking  
🔑 **Passwordless** – users get cryptographic identity keypairs  
🦸 **User-sovereign** – users can download their keys and take them anywhere  
📱 **Clientside** – no api servers, 100% statically hosted on github pages  
⛵ **Federated** – get verifiable access tokens with the authduo.org popup flow  
🌐 **Decentralized** – fork and self-host if you like  
📜 **Protocol** – let's build an open ecosystem of auth services for users  
💖 **Free and open source** – zero cost at worldwide scale  

<br/>

> #### Pre-release warning
>
> Authduo is unfinished and unstable.  
> It's a prototype, and should only be used by intrepid innovators and idealistic experimenters.  

<br/>

## 😎 Easy HTML Installation

Choose this installation method if you don't know any better.

1. **Insert this into your html page's `<head>`**
    ```html
    <script type="module" src="https://authduo.org/install.js"></script>

    <script type="module">
      document.querySelector("auth-login").auth.onChange(login => {
        if (login) console.log("logged in", login)
        else console.log("logged out")
      })
    </script>
    ```
    - customize the custom script tag to handle logins and logouts
    - when the user logs in, the `login` looks like this:
      ```js
      login.name // Kaylim Bojrumaj
      login.thumbprint // "4e77bccf..."
      login.expiresAt // 1729381451374
      login.token // <raw data that can be crypto-verified>
      ```
    - when the user logs out, `login` is `null`
1. **Insert this login button into your html page's `<body>`**
    ```html
    <auth-login></auth-login>
    ```
    - this provides a nice little status/button ui for users to login or logout
1. 🎉 **You're done!**
    - Now you can do whatever you want with that `login` object.
    - You might display the `login.name` in your ui
    - You might use the `login.thumbprint` as a unique identifier for that user
    - You might even pass that `login.token` to an api server

<br/>

## 🧐 Sophisticated Authduo Installation

Choose this installation method if you're familiar with npm, package.json, and typescript.

1. **Install the npm package into your package.json**
    ```sh
    npm i @authduo/authduo
    ```
1. **Register the web components onto your page.** *(`main.ts`)*
    ```ts
    import {register_to_dom, components} from "@authduo/authduo"

    register_to_dom(components)
    ```
1. **Listen for changes on the global authduo object.** *(`main.ts`)*
    ```ts
    import {auth} from "@authduo/authduo"

    auth.onChange(login => {
      if (login) console.log("logged in", login)
      else console.log("logged out")
    })
    ```
1. **Place some login buttons onto your page.** *(`index.html`)*
    ```html
    <auth-login></auth-login>
    ```

<br/>

## 🗽 Free Auth for Everybody at https://authduo.org/

### [Authduo.org](https://authduo.org/) is an identity management app for users
- On *authduo.org,* users can create, edit, delete, export, and import their identities
- Identities are cryptographic keypairs, and are stored locally in the user's web browser
- Users can export their identity key files to back them up themselves
- Users can share their identities across devices by importing their identities
- Authduo doesn't have any servers that store any user information
- It's zero-cost for you and your users

### [Authduo.org](https://authduo.org/) provides federated logins for your apps
- When the user clicks the login button, it opens a popup to *authduo.org*
  - in the popup, users are prompted to create or select a login identity
  - your app receives back a postmessage with an access-token — *boom, that's a login!*
- Your app doesn't need direct access to the user's cryptographic keys
  - we can allow an unlimited number of skethcy third-party apps to authenticate their users this way, all without risking the security of the keys
  - your app and your api microservices can easily cryptographically verify the authenticity of a user login
- It's zero-cost for you and your users

### [Authduo.org](https://authduo.org/) is for your own convenience, not vendor lock-in!
- The official authduo app can also be convenient for users, as they can reuse their identities there across any app that integrates with it
- You can fork authduo and make a better identity management app if you like
- You can point the authduo login component to your own self-hosted app:
  ```html
  <auth-login src="https://authduo.org/"></auth-login>
  ```
  - you can simply point the `src` url at your own self-hosted fork
- Users can choose to import their identities to your better auth interface if they like it more
  - that's what we mean by "decentralized and user-sovereign auth *protocol*"

<br/>

## 🌠 The More You Know

### How can users login across multiple devices?
- Users can export identity files from one device, and import them onto another.

### What if users lose their keys?
- Lose your keys, lose your account. With great power comes great responsibility.
- Okay, that is too hardcore for casual users, so let's build some softer opt-in services for users.

### Opt-in services
- Authduo's core has to stay simple clientside to enable user sovereignty and privacy.
- But we can build nice opt-in services, enabling users to choose to trade some of that sovereignty for conveniences:
  - opt-in service for username+password logins
  - opt-in service for email-based recovery
  - opt-in service for otp/qr codes to easily transfer identities across devices
  - opt-in service for two-factor authentication

### What if users share their identity files with friends or the public?
- Well, it's the same problem as somebody sharing their username/password in a traditional setup.
- Depending on what services you provide, you might take different strategies.
- For example, I'm making multiplayer games:
  - I'm just going to have my game servers reject simultaneous connections from the same identity.
- For an ecommerce example:
  - I'll probably have my ecommerce microservice use stripe, which will associated digital property with an email address
  - Then I can make an email recovery flow where users can reset which Authduo identity is authorized to access the digital property.

### Authduo is just built different
- There's a paradigm shift you need to understand if you want user-sovereign identities.
- From the perspective of a developer:
  - You yield control of identity *authentication* to your users.
  - But you still control how your services are *authorized*.
  - This means, if a user loses their identity, you can just change which identity is *authorized* for those associated services.
  - In other words, you can still provide traditional recovery mechanisms for your users.
  - Eg, you can give users a flow to re-associate your services to a new identity of theirs.

<br/>

## 🔨 More advanced integration examples

- **Programmatically trigger a login** `main.js`
  ```js
  import {accountant} from "@authduo/authduo"

  myButton.onclick = async() => {
    const access = await accountant.login("https://authduo.org/")
    if (access)
      console.log("logged in", access)
  }
  ```
- **Do stuff on your own servers.**
  - send the access token to your serverside. `main.js`
    ```js
    import {accountant} from "@authduo/authduo"

    await sendToMyServer(accountant.access)
    ```
  - receive and verify it cryptographically on your server. `server.js`
    ```js
    import {verify} from "@authduo/authduo"

    myServerReceive(async rawAccess => {
      const access = await verify(rawAccess)
      if (access) console.log("verified", access)
      else console.error("invalid access token", rawAccess)
    })
    ```

<br/>

## 💖 Authduo is free and open source

- I wanted passwordless auth that I didn't have to pay for, and I realized that a clientside protocol leveraging the WebCrypto API would cost slim-to-none, scale infinitely, and put users in control of their own privacy and identity.
- I also realized that I could still build my own microservices which verify the access tokens to provide any "centralized" features I could imagine, like ecommerce, or advanced authorizations, or whatever else.
- And then I realized that anybody could integrate these access tokens for their own apps, and it wouldn't cost me anything. So, here we are.
- : https://discord.gg/BnZx2utdev

