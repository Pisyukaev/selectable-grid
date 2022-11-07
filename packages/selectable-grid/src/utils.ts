export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => fn(args), ms)
  }
}

export function throttle<T extends (...args: any[]) => ReturnType<T>>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => ReturnType<T> {
  let isThrottle: boolean
  let lastResult: ReturnType<T>

  return (...args) => {
    if (!isThrottle) {
      isThrottle = true
      setTimeout(() => (isThrottle = false), ms)
      lastResult = fn(...args)
    }

    return lastResult
  }
}
