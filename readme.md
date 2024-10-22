
![Authduo.org](https://i.imgur.com/Pr6ILnz.png)

# 🗽 Free Passports for Everybody at [Authduo.org](https://authduo.org/)

[Authduo.org](https://authduo.org/) is an app where users can create and manage digital login passports.

You can add a *"Login with Authduo"* button to your website, allowing users to login using an Authduo passport.

🔑 **Passwordless** – passports are cryptographic keypairs  
🗽 **User-sovereign** – users can directly download their passport files  
🥷 **Privacy-focused** – users can be anonymous: no emails, no tracking  

💖 **Free and open source** – zero cost at worldwide scale  
🥞 **Easy as pancakes** – paste in a tiny amount of code to get logins  
📱 **Clientside** – statically hosted on github pages, no api servers  

🏛️ **Federated** – get login tokens from the authduo.org popup flow  
🌐 **Decentralized** – fork and self-host if you'd rather  
📜 **Protocol** – permissionless integration, you can do it your way  

> ***Pre-release:*** Authduo is an unfinished prototype, use at your own risk.

<br/>

## 🆒 [Authduo.org](https://authduo.org/) Login Button

### Easy HTML Installation

*Choose this installation method if you don't know any better.*

1. **Insert this in your `<head>`:**
    ```html
    <script type="module" src="https://authduo.org/install.bundle.min.js"></script>

    <script type="module">
      document.querySelector("auth-login").auth.onChange(login => {
        if (login) console.log("logged in", login)
        else console.log("logged out")
      })
    </script>
    ```
    - Customize that second script to handle logins/logouts your way
    - When the user logs in, the `login` object looks like this:
      ```js
      login.name // Kaylim Bojrumaj
      login.thumbprint // "4e77bccf..."
      login.expiresAt // 1729381451374
      login.token // <raw data that can be crypto-verified>
      ```
    - When the user logs out, `login` is `null`
1. **Put this button in your `<body>`:**
    ```html
    <auth-login></auth-login>
    ```
    - This provides a nice little status/button ui for users to login or logout

### Sophisticated Installation for App Devs

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

## 💁 [Authduo.org](https://authduo.org/) is for convenience, not vendor lock-in
- You can fork Authduo to make your own passport management app, and users can take their passport files there instead
- You can point the login button to your own fork:
  ```html
  <auth-login src="https://authduo.org/"></auth-login>
  ```
  - Just swap `https://authduo.org/` with your own url
  - This is what "decentralized", "user-sovereign", and "protocol" is all about

<br/>

## 🌠 The More You Know About [Authduo.org](https://authduo.org/)

### How can users login across multiple devices?
- Users can export passports and import them on other devices.

### What if my users lose their passports?
- They'll just generate new passports.
- If you associate important services to your users' passports, you should provide a recovery mechanism so users can re-associate those services with new passports.

### Opt-in services for casual user experience
- While Authduo's core must stay lean to retain user-sovereignty and privacy, we can still build optional services which allow users to trade a little sovereignty for some conveniences:
  - Username and password logins
  - Email-based recovery
  - OTP/QR codes to easily transfer passports across devices
  - Two-factor auth

<br/>

## 🧐 More advanced integration examples

- **Programmatically trigger a login.** `main.js`
  ```js
  import {auth} from "@authduo/authduo"

  myButton.onclick = async() => {
    const login = await auth.popup("https://authduo.org/")
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
    import {verify} from "@authduo/authduo/x/server.js"

    myServerReceive(async token => {
      const login = await verify(token)
      if (login) console.log("verified", login)
      else console.error("invalid token", token)
    })
    ```
    - notice that on the server we import from a different entrypoint

<br/>

## 💖 [Authduo](https://authduo.org/) is free and open source
- I built Authduo because I wanted free user-centric auth for my apps.
- Got questions or feedback? Don't hesitate to open a github issue or discussion anytime.
- My name is Chase Moskal, ping me on discord: https://discord.gg/BnZx2utdev

