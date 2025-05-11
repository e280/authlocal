
![](https://i.imgur.com/Ao6piCO.png)

# 🔒 [Authlocal.org](https://authlocal.org/) User Guide
> ***Developers,*** also see the technical [README.md](README.md)

**Manage your identities at https://authlocal.org/**  

🗽 **User-sovereign** – you own your identity  
🔑 **Cryptographic** – no emails, no passwords  
🥷 **Privacy-focused** – device-local, no databases  
🥞 **Easy as pancakes** – login with two clicks  
💖 **Free and open-source** – zero-cost at global scale  

### You hold the keys

Authlocal stores identities *locally* in your web browser, on your device.

You must keep your keys safe, because some web browsers have a habit of unexpectedly wiping your web storage *(Safari, we see you).*

### Any third-party website can request your login from https://authlocal.org/

You can approve login requests in the Authlocal popup. Third-party websites *never* see your seed.

<br/>

## 🤔 Authlocal FAQ

### What if I lose my identity file or seed?
- It's gone. Generate a new one.
- Some apps may offer recovery options, but some won't. Back up your seeds!

### How do I recover my identity from a seed?
- Go to https://authlocal.org/, then either:
    1. Drag-and-drop your seed file from your computer.
    1. Click `Import` and use the `Uploader` tab to choose a seed file from your computer.
    1. Click `Import` and use the `Recovery seed` tab to paste the seed text in directly.

### Somebody, or some website, asked for my seed?
- It's a scam! Never share your seed with anybody anywhere except https://authlocal.org/

### What's with the weird names like "`dozmut.winpex`"?
- That's a *sigil*, the shorthand for an identity's cryptographic thumbprint.
- Thumbprint: "`dozmut.winpex.linner.forsep.KgisJ8Pdgey1HC4o8cG59NaLYSoRTiHfA`"
  - This is the full-size and formal public identifier.
  - There are more possible thumbprints than atoms in the entire galaxy. And there are a quintillion atoms in a grain of sand... I mean, think about that for awhile.. There are a lot of atoms...

### Can I change the color associated with my identity?
- No. It's derived from the identity's cryptographic thumbprint, which cannot be changed.

### What does "Persistence off" mean?
- If it says *"Persistence off"*, your browser *might* delete your identities after awhile.
- You can click it to request persistence. Firefox will ask politely. Safari and Chrome will usually ignore you.
- Safari is the worst — if persistence is off, there's a 7-day inactive data deletion policy — so Safari users will need to re-import identities.

### Zero-cost at global scale? How is it technically possible!?
- [Authlocal.org](https://authlocal.org/) is a static http deployment. Dirt cheap hosting.
- No api servers or microservices. Runs clientside, using postMessage.
- It's open source, so GitHub Pages is willing to host it for free.

### How many people are using Authlocal?
- We don't know.
- We don't collect data or track analytics.
- Star this project on GitHub to give us a clue.

### What vectors threaten my keys on [authlocal.org](https://authlocal.org/)?
- Yourself.
- Your web browser, operating system, and hardware.
- GitHub and GitHub Pages, which hosts the source and app for free.
  - They surely record their own pageview analytics, and a compromised Microsoft could inject a trojan to steal keys on authlocal.org.
  - In the future, we may need to secure funding to host Authlocal on its own security hardened servers.
- Maintainers of e280: https://github.com/e280/
  - [Chase Moskal](https://github.com/chase-moskal/)
  - [Przemysław Gałęzki](https://github.com/zenkyuv)
- Maintainers of dependencies:
  - [`@noble/ed25519`](https://github.com/paulmillr/noble-ed25519) — [Paul Miller](https://github.com/paulmillr)
  - [`@benev`](https://github.com/benevolent-games) — [Chase Moskal](https://github.com/chase-moskal/), [Lonnie Ralfs](https://github.com/lonnie-ralfs/)
  - Technical people can investigate the dependencies in the [package.json](package.json)

<br/>

## 💖 Authlocal is free and open source
- Authlocal is an https://e280.org/ project.
- Got questions or feedback? Don't hesitate to open a github issue or discussion anytime!
- Like the project? Star it on github, it's the only way we're paid.

