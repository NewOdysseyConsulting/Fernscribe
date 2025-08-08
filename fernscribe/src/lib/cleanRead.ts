const FILLERS = [
  'um', 'uh', 'erm', 'hmm', 'ah', 'uhm', 'like', 'you know', 'kind of', 'sort of', 'i mean', 'so,', 'well,', 'okay', 'ok', 'right,', 'actually', 'basically'
]

export function cleanReadText(text: string) {
  let t = ' ' + text + ' '
  for (const f of FILLERS) {
    const pattern = new RegExp(`(\\s|^)${f.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}(\\s|[.,!?])`, 'gi')
    t = t.replace(pattern, (m, p1, p2) => `${p1 || ' '}${p2 || ' '}`)
  }
  t = t.replace(/\s{2,}/g, ' ').trim()
  return t
}