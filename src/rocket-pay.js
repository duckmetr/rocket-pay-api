import axios from 'axios'

class RocketPay {
  constructor(token, options = {}) {
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
      app: {
        info: '/app/info',
        transfer: '/app/transfer',
      },
      multiCheques: '/multi-cheques',
      tgInvoices: '/tg-invoices'
    }
  }

  async version() {
    const res = await this.api.get(this.#endpoints().version)
    return res.data
  }

  async info() {
    const res = await this.api.get(this.#endpoints().app.info)
    return res.data
  }

  async transfer(data) {
    const res = await this.api.post(this.#endpoints().app.transfer, data)
    return res.data
  }

  async createMultiCheque(data) {
    const res = await this.api.post(this.#endpoints().multiCheques, data)
    return res.data
  }

  async getMultiCheques(limit, offset) {
    const res = await this.api.get(this.#endpoints().multiCheques)
    return res.data
  }

  async getMultiCheque(id) {
    const res = await this.api.get(`${this.#endpoints().multiCheques}/${id}`)
    return res.data
  }

  async editMultiCheque(id, data) {
    const res = await this.api.put(`${this.#endpoints().multiCheques}/${id}`, data)
    return res.data
  }

  async deleteMultiCheque(id) {
    const res = await this.api.delete(`${this.#endpoints().multiCheques}/${id}`)
    return res.data
  }

  async createInvoice(data) {
    const res = await this.api.post(this.#endpoints().tgInvoices, data)
    return res.data
  }

  async getInvoices(limit, offset) {
    const res = await this.api.get(this.#endpoints().tgInvoices)
    return res.data
  }

  async getInvoice(id) {
    const res = await this.api.get(`${this.#endpoints().tgInvoices}/${id}`)
    return res.data
  }
}

export default RocketPay