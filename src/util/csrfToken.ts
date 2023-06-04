// https://codong.tistory.com/28
// https://nachwon.github.io/how-to-send-csrf-token-ajax/
export function getCookie(name: string): string | null {
  let cookieValue: string | null = null
  if (document.cookie !== null && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}
