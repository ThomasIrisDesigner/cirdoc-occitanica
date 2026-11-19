export const GALLICA_ADVANCED = 'https://gallica.bnf.fr/html/und/recherche-avancee'

export function gallicaResultsUrl(term: string) {
  const safe = term.replace(/"/g, '')
  const params = new URLSearchParams({
    operation: 'searchRetrieve',
    exactSearch: 'false',
    collapsing: 'true',
    version: '1.2',
    query: `(gallica all "${safe}")`,
    keywords: safe,
  })
  return `https://gallica.bnf.fr/services/engine/search/sru?${params}`
}
