
# authduo todo

- (wontfix) de-asyncify toData/fromData, so serialization/deserialization is seamless?
  - nah, it's of no benefit, since there's no reason to fromData unless you want the live keys
- improved story about how the ui behaves when tokens expire
- improved ui for mobile devices
- (wontfix) users can choose emoji as avatars
  - nah, because each application wants its own avatar system, users can insert an emoji into their username
- users (not devs) can choose how long to authorize an app (1-hour, 24-hours, 7-days)
- story for versioning between downstream apps and the federated page on authduo.org
- story for third-party integration of opt-in services appearing on the authduo.org app
- "nuclear wipe all" delete button for deleting multiple passports at once

