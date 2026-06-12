import api from '../api/axiosConfig.js'

export const authService = {
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials)
    return data
  }
}
