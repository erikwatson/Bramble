export function save(key: string, value: string): void {
  localStorage.setItem(key, value)
}

export function load(key): string {
  return localStorage.getItem(key)
}
