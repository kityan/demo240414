import { useEffect, useState } from "react"

export function useThrottle<T extends (...args: any) => any>(ms: number | undefined, action: T) {
  const [last, setLast] = useState<number>(0)
  const [latched, setLatched] = useState<boolean>(false)

  useEffect(() => {
    let tm: ReturnType<typeof setTimeout>
    if (ms != null) {
      tm = setTimeout(() => setLatched(!latched), ms)
    }
    return () => tm && clearTimeout(tm)
  }, [last])

  if (ms == null || last < Date.now() - ms) {
    return function (...args: Parameters<T>): ReturnType<T> {
      setLast(Date.now())
      return action.apply(null, args)
    }
  } else {
    // console.log("throttled")
    return undefined
  }
}
