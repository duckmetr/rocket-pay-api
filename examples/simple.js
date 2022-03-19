import RocketPay from 'rocket-pay-api'

const token = 'YOURTOKEN'

(async function run() {
  const rocketPay = new RocketPay(token)

  // A simple method for testing your app's authentication token
  const appInfo = await rocketPay.info()
  console.log(appInfo)
})()