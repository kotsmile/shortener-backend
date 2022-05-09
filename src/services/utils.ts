export function getRandom() {
  return (
    Math.random().toString(32).substring(2, 6) +
    Math.random().toString(32).substring(2, 6)
  )
}
