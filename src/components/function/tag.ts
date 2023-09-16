export const tagProcess = (tagtext: string): string => {
  const regex = /@\[([^\]]+)\]\([^)]+\)/g
  return tagtext.replace(regex, '@$1')
}
