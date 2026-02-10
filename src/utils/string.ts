// convert kebab-case to camelCase access
export const camelToKebab = (str: string) =>
    str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
