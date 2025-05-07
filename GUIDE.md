
# 🔒 [Authlocal.org](https://authlocal.org/) User Guide
> ***Want it for your website?*** See the [Developer Readme](README.md) instead.

🔑 **Cryptographic** – no emails, no passwords  
🗽 **User-sovereign** – users own their identity, no databases  
🥷 **Privacy-focused** – not collecting data  
🥞 **Easy as pancakes** – logins are fast and painless for users  
💖 **Free and open-source** – zero cost at worldwide scale  

<br/>

## [Authlocal](https://authlocal.org/) frequently asked questions

### Zero-cost at worldwide scale? How is it technically possible!?
- [Authlocal.org](https://authlocal.org/) is a 100% static http deployment. Dirt cheap to host.
- No api servers or microservices or anything like that.
- It's a clientside app, where users manage identities, and it operates via clientside postMessage.
- And it's open source, which means GitHub Pages is willing to host it for free.

### Who am I really trusting with my identity keys?
- Yourself.
- Your web browser.
- GitHub and GitHub Pages, which hosts the source and app for free.
- Authlocal maintainers: https://github.com/authlocal/
  - [Chase Moskal](https://github.com/chase-moskal/), creator. Victoria BC, Canada. He says:  
    > *On pain of death, I swear Authlocal will always be free, open, user-sovereign, and privacy-focused.*
- The maintainers of the [package.json](package.json) dependencies:
  - [`@noble/ed25519`](https://github.com/paulmillr/noble-ed25519) by [Paul Miller](https://github.com/paulmillr)
  - [`@e280`](https://github.com/orgs/e280) by [Chase Moskal](https://github.com/chase-moskal/) and [Przemysław Gałęzki](https://github.com/zenkyuv)
  - [`@benev`](https://github.com/benevolent-games) by [Chase Moskal](https://github.com/chase-moskal/) and [Lonnie Ralfs](https://github.com/lonnie-ralfs/)

### What if I lose my identity file or seed?
- You'll have to create a new identity.
- For important services attached to your identity, responsible app developers will provide you with a recovery mechanism, to reassign those services to your new identity.

<br/>

## 💖 [Authlocal](https://authlocal.org/) is free and open source

My name is Chase Moskal, and I built Authlocal because I wanted free user-centric auth to power [benevolent.games](http://benevolent.games/).

Got questions or feedback? Don't hesitate to open a github issue or discussion anytime.

Like the project? Star it on github, it's the only way I'm paid.

