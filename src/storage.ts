export function save(key: string, value: string): void {
  localStorage.setItem(key, value)
}

export function load(key): string {
  return localStorage.getItem(key)
}

export function remove(key: string): void {
  localStorage.removeItem(key)
}

export function clear(): void {
  localStorage.clear()
}
