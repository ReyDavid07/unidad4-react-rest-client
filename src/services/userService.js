import api from '../api/axiosConfig.js'

const resource = '/users'

export const userService = {
  async findAll() {
    const { data } = await api.get(resource)
    return data
  },

  async findById(id) {
    const { data } = await api.get(`${resource}/${id}`)
    return data
  },

  async create(payload) {
    const { data } = await api.post(resource, payload)
    return data
  },

  async update(id, payload) {
    const { data } = await api.put(`${resource}/${id}`, payload)
    return data
  },

  async remove(id) {
    await api.delete(`${resource}/${id}`)
  }
}
