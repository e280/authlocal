
## Authlocal for HTML Developers

1. Install the authlocal script tag into your html `head`
  ```html
  <script
    type="module"
    authlocal-theme="basic"
    src="https://authlocal.org/install.bundle.min.js"
  ></script>
  ```
  You can change the `authlocal-theme` attribute there
  - `basic` — default theme
  - `plain` — no styling
  - `e280` — matches authlocal.org's aesthetic
1. Put these authlocal web components into your html `body`
  ```html
  <auth-user></auth-user>
  <auth-button></auth-button>
  ```
1. Use a little javascript to react to logins and logouts
  ```html
  <script defer>
    authlocal.then(({auth}) => {
      auth.onChange(login => {
        if (login) console.log("logged in", login.label)
        else console.log("logged out")
      })
    })
  </script>
  ```

