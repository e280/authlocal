
![Authduo.org](https://i.imgur.com/Pr6ILnz.png)

# 🗽 [Authduo.org](https://authduo.org/) – Free Auth for Everybody

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

> ***Pre-release:** Authduo is an unfinished prototype, use at your own risk.*

<br/>

## 🪪 [Authduo.org](https://authduo.org/) Login Button

Try out the login button at the [Federated Test Page](https://authduo.org/federated/)

### 😎 Easy HTML Installation

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
      login.expiry // 1729381451374
      login.token // <raw data that can be crypto-verified>
      ```
    - When the user logs out, `login` is `null`
1. **Put this button in your `<body>`:**
    ```html
    <auth-login></auth-login>
    ```
    - This provides a nice little status/button ui for users to login or logout

### 🧐 Sophisticated Installation for App Devs

*Choose this installation method if you're familiar with npm, package.json, typescript – stuff like that.*

1. **Install the npm package**
    ```sh
    npm i @authduo/authduo
    ```
1. **Register components and listen for auth changes.** `main.ts`
    ```ts
    import {register_to_dom, components, auth} from "@authduo/authduo"

    register_to_dom(components)

    auth.onChange(login => {
      if (login) console.log("logged in", login)
      else console.log("logged out")
    })
    ```
1. **Throw down some login buttons.** `index.html`
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

## 🌠 The More You Know, about [Authduo.org](https://authduo.org/)

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

## 🛠️ More advanced integration examples

### Programmatically trigger a login
- You can use `auth.popup` to trigger a login, but you should do this in reaction to a user input event, otherwise the browser will block the popup.
  ```js
  import {auth} from "@authduo/authduo"

  myButton.onclick = async() => {
    const login = await auth.popup("https://authduo.org/")
    if (login) console.log("logged in", login)
  }
  ```

### Understanding the Authduo flow and tokens
- When your user logs in, you receive a *Login* object (a verified *login token*).
  - Don't pass this around, anybody with the login token can impersonate your user.
  - Instead of passing the login token around, you can use the login object to *sign* your own *challenge tokens*.
- Let's consider an example: you're making a player-hosted multiplayer game.
  - Your user logs in, and you get a *Login* object.
  - You want to send your user's identity to the host of the game, so they can verify it, and nobody can impersonate your user.
  - So you use your *Login* object to sign a fresh *challenge token* containing your user's name and other info.
  - You send this *challenge token* along with your *login.proofToken* to the game host.
  - The game host receives your `challengeToken` and `proofToken`, and now can verify that your challenge was authentically signed on behalf of the user's passport.

### `Login`, `Challenge`, and `Proof`
- **Sign a fresh challenge token.**
  ```js
  import {FromNow} from "@authduo/authduo"

  const challengeToken = await login.signChallengeToken({
    expiry: FromNow.hours(24),

    // you can pack any abitrary data you want into this token
    data: {
      username: "Rec Doamge",

      // we've scoped this token to this game session,
      // so that it cannot be stolen and reused in other game sessions.
      gameSessionId: "9c22b17e",
    },
  })
  ```
- **Send the *challengeToken* along with a *proofToken.***
  ```js
  await sendElsewhere({
    proofToken: login.proofToken,
    challengeToken,
  })
  ```
  - Each `login` object comes with a `proofToken` that is required to verify a challenge token.
- **Verify the proof and challenge**
  ```js
  import {Proof, Challenge} from "@authduo/authduo"

  receiveElsewhere(async(proofToken, challengeToken) => {
    const proof = await Proof.verify(proofToken)
    const challenge = await Challenge.verify(proof, challengeToken)

    // here's that data you packed into the challenge
    console.log(challenge.data.username) // "Rec Doamge"
    console.log(challenge.data.gameSessionId) // "9c22b17e"

    // user passport public thumbprint, the true user identifier
    console.log(challenge.thumbprint) // "a32e638e..."
    console.log(proof.thumbprint) // "a32e638e..."
  })
  ```
  - The same proof can be used to verify multiple challenges from the same login.

<br/>

## 💖 [Authduo](https://authduo.org/) is free and open source
- I built Authduo because I wanted free user-centric auth for my apps.
- Got questions or feedback? Don't hesitate to open a github issue or discussion anytime.
- My name is Chase Moskal, ping me on discord: https://discord.gg/BnZx2utdev

