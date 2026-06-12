import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const data = error?.response?.data

    let message = 'No fue posible comunicarse con el servidor.'

    if (typeof data === 'string') {
      message = data
    } else if (data?.message) {
      message = data.message
    } else if (data?.error) {
      message = data.error
    } else if (data && typeof data === 'object') {
      const validationMessages = Object.values(data).filter(Boolean)
      if (validationMessages.length > 0) {
        message = validationMessages.join(' | ')
      }
    } else if (status === 404) {
      message = 'Recurso no encontrado en el API.'
    } else if (status >= 500) {
      message = 'Error interno del servidor.'
    }

    return Promise.reject({
      status,
      message,
      originalError: error
    })
  }
)

export default api
