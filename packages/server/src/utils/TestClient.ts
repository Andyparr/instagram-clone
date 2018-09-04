import * as rp from 'request-promise'

export class TestClient {
  url: string
  options: {
    jar: any
    withCredentials: boolean
    json: boolean
  }
  constructor(url: string) {
    this.url = url
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true
    }
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string
  ) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          register(
            input: {
              firstName: "${firstName}",
              lastName: "${lastName}",
              email: "${email}",
              password: "${password}",
              username: "${username}"
            }
          ) {
            ok
            message
            path
          }
        }
        `
      }
    })
  }

  async logout() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          logout
        }
        `
      }
    })
  }

  async forgotPasswordChange(newPassword: string, key: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            forgotPasswordChange(newPassword: "${newPassword}", key: "${key}") {
              path
              message
            }
          }
        `
      }
    })
  }

  async me() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          {
            me {
              id
              email
            }
          }
        `
      }
    })
  }

  async login(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          login(input: { emailOrUsername: "${email}", password: "${password}" }) {
            ok
            path
            message
          }
        }   
        `
      }
    })
  }
}
