# rocket-pay-api

**[Rocket Pay](https://t.me/tonRocketBot)** is a payment system based on [@tonRocketBot](https://t.me/tonRocketBot?start=i_jUltLnHEUE), which allows you to accept payments in cryptocurrency using the API.

This library help you to work with **Rocket Pay** via [Rocket Pay API](https://pay.ton-rocket.com/api/#/)

## Install

```sh
npm i rocket-pay-api
```

## Usage

### API

First, you need to create your application and get an API token. Open [@tonRocketBot](https://t.me/tonRocketBot) or [@ton_rocket_test_bot](https://t.me/ton_rocket_test_bot) (for testnet), create a new app and get API Token.

Next step: try to call a simple `info()` method to check that everything is working well:

```js
import RocketPay from 'rocket-pay-api'

const rocketPay = new RocketPay(token)
const myAppInfo = await rocketPay.info()
console.log(myAppInfo)
```

You can setup net `hostname` (defaults to `pay.ton-rocket.com`)

```js
const rocketPay = new RocketPay(token, {
  hostname: 'https://dev-pay.ton-rocket.com'
});
```

Net     | Bot                                                         | Hostname
------- | ----------------------------------------------------------- |------------------------
mainnet | [@tonRocketBot](http://t.me/tonRocketBot)               | `https://pay.ton-rocket.com`
testnet | [@ton_rocket_test_bot](http://t.me/ton_rocket_test_bot) | `https://dev-pay.ton-rocket.com`

> All queries to the Rocket Pay API must be sent over **HTTPS**

You can find all available methods in [next chapter](#Methods).

Look full code in the [examples directory](https://github.com/duckmetr/rocket-pay-api/tree/main/examples)
## Methods

**API**

* [version](#version)
* [info](#info)
* [transfer](#transfer)
* [createMultiCheque](#createMultiCheque)
* [getMultiCheques](#getMultiCheques)
* [getMultiCheque](#getMultiCheque)
* [editMultiCheque](#editMultiCheque)
* [deleteMultiCheque](#deleteMultiCheque)
* [createInvoice](#createInvoice)
* [getInvoices](#getInvoices)
* [getInvoice](#getInvoice)

### version

Returns current version of API. You may use it as healthcheck

```js
rocketPay.version()
```

### info

A simple method for testing your app's authentication token. Requires no parameters. Returns basic information about the app.

```js
rocketPay.info()
```

### transfer

Use this method to send coins from your app to the user. Returns object of completed transfer.

* **tgUserId** (number)
Telegram User ID. The user needs to have an account in our bot (send /start if no)
* **currency** (string)
Currency code. Supported assets: `TONCOIN`
* **amount** (number)
Amount of the transfer in float. For example: `1.23`
* **transferId** (string)
It is used to make your request idempotent
* **description** (string)
*Optional*. The comment of the invoice

```js
rocketPay.transfer({
  tgUserId: 87209764,
  currency: "TONCOIN",
  amount: 1.23,
  transferId: "abc-def",
  description: "You are awesome!"
})
```
### createInvoice

Use this method to create a new invoice. Returns object of created invoice.

* **amount** (number)
Amount of the invoice in float. For example: `1.23`
* **currency** (string)
Currency code. Supported assets: `TONCOIN`
* **description** (string)
*Optional*. Description of the invoice
* **hidden_message** (string)
*Optional*. The message will show when the user pays your invoice
* **callbackUrl** (string)
*Optional*. Callback url
* **payload** (string)
*Optional*. Some data. User ID, payment id, or any data you want to attach to the invoice.

```js
rocketPay.createInvoice({
  amount: 1.23,
  currency: "TONCOIN",
  description: "best thing in the world, 1 item",
  hiddenMessage: "thank you",
  callbackUrl: "https://t.me/ton_rocket",
  payload: "some custom payload I want to see in webhook or when I request invoice"
})
```

### getInvoices

Use this method to get invoices of your app. On success, the returns array of invoices
```js
rocketPay.getInvoices()
```