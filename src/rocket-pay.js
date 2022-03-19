import axios from 'axios'

class RocketPay {
  constructor(token, options = {}) {
    this.token = token
    this.api = axios.create({
      baseURL: options.hostname ?? 'https://pay.ton-rocket.com',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Rocket-Pay-Key': token
      }
    })
  }

  #endpoints() {
    return {
      version: '/version',
      appInfo: '/app/info',
      appTransfer: '/app/transfer'
    }
  }

  async version() {
    const res = await this.api.get(this.#endpoints().version)
    return res.data
  }

  async appInfo() {
    const res = await this.api.get(this.#endpoints().appInfo)
    return res.data
  }

  async appTransfer() {
    const res = await this.api.get(this.#endpoints().appTransfer)
    return res.data
  }
}

export default RocketPay