import User from "../types/User"
import config from "../config"

type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[]

type CachedResult = {
  value: JSONValue,
  validTill: number
}

const cache: Map<string, Map<string, CachedResult>> = new Map()


export const api = {
  /**
   * Получение случайного пользователя
   */
  async fetchRandomUser(): Promise<User> {

    const id = Math.floor(Math.random() * (10 - 1)) + 1

    if (!cache.get("fetchRandomUser")) {
      cache.set("fetchRandomUser", new Map())
    }

    const cacheSlice = cache.get("fetchRandomUser")!

    const cached = cacheSlice.get(id.toString())

    if (cached && cached.validTill > Date.now()) {
      console.log('api result from cache')
      return cached.value as User
    }

    const response = await fetch(`${config.URL}/${id}`)
    const value = await response.json()
    console.log('api result from server')
    cacheSlice.set(id.toString(), { value, validTill: Date.now() + config.cachedValidPeriodMs })
    return value as User

  },
}

export default api
