## Links
- test site https://www.ploom.co.uk/en
- code repository https://github.com/robkub19/ploom

## Commands
- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://www.ploom.co.uk/en`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI  
`npx playwright test --headed`
- view report  
`npx playwright show-report`

## Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

    ## Visual Studio Code
    - Preview: for README.md
    - Auto Save: in File -> Auto Save
    - Timeline: file context menu
    - Formatting: editor -> context menu -> Format document

