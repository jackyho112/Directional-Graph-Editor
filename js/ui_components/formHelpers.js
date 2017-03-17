import browser from 'detect-browser'

export function getColorInputType() {
  if (browser.name.match(/explorer/i)) return 'text'
  return 'color'
}
