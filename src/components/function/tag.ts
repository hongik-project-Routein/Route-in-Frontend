export const tagProcess = (tagtext: string): string => {
  const regex = /@\[([^\]]+)\]\([^)]+\)/g
  return tagtext.replace(regex, '@$1')
}

export const getTagList = (text: string): string[] => {
  const mentionRegex = /@(\w+)/g
  const mentions = []
  let match

  while ((match = mentionRegex.exec(text)) !== null) {
    mentions.push(match[1])
  }

  return mentions
}
