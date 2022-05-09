export function getRandom() {
  var random_string =
    Math.random().toString(32).substring(2, 5) +
    Math.random().toString(32).substring(2, 5)
  return random_string
}
