# END TO END TESTS

This project is using [Browserstack](https://automate.browserstack.com/dashboard/v2/quick-start/get-started#introduction) as service to execute end to end tests for flowcards experiences with real devices

## Tech Stack

End to End tests are using

* [WebdriverIO](https://webdriver.io/docs/gettingstarted): Next-gen browser and mobile automation test framework for Node.js
* [chai](https://www.chaijs.com/): Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
* [Appium](https://webdriver.io/docs/appium-service/): Appium is an open-source, cross-platform test automation tool for native, hybrid, and mobile web and desktop apps. It supports simulators (iOS), emulators (Android), and real devices (iOS, Android, Windows, Mac).
* [Browserstack Local](https://github.com/browserstack/browserstack-local-nodejs): Browserstack utility to run the service with local environment

## Usage

There are 3 ways we are going to use the service:
* Browserstack Remote
* Browserstack Local
* Local

### Browserstack Remote

It invokes Browserstack service with a URL in production. This scenario is thought to run in the CI/CD Pipeline of `flowcards-playground` when updating flowcards' experiences.

### Browserstack Local

It invokes Browserstack service with `bs-local` as URL host, tunneling localhost's machine to remote Browserstack Service. This allows Browserstack Automate service to resolve localhost. This scenario is thought to be integrated in Flowcards CI/CD Pipeline to test bundled changes in a branch served locally against remote Browserstack Automate service.

### Local

It uses Appium as local server and runs it against a local device (emulator or physical one connected to your machine). This is thought for local development.

## Technical limitations

* WebdriverIO is not compatible with Jest, the test library used in Flowcards, that's it ws chosen chai as [one of the libraries compatible](https://webdriver.io/docs/frameworks/) with WebdriverIO
