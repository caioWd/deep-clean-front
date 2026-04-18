export function getInitials(name: string): string {
  if (!name) return ''

  const cleanName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  const words = cleanName.trim().split(/\s+/)

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  if (words.length === 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}