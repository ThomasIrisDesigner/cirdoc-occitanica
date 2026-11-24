import uneA from '@/assets/home/une-a.png'
import uneB from '@/assets/home/une-b.png'
import uneC from '@/assets/home/une-c.png'
import uneD from '@/assets/home/une-d.png'
import introFigures from '@/assets/home/intro-figures.jpg'
import introHistoires from '@/assets/home/intro-histoires.jpg'
import introLitterature from '@/assets/home/intro-litterature.jpg'
import introMusiques from '@/assets/home/intro-musiques.jpg'
import { gabaritPath } from '@/data/editorialArticle'

export type ArticleHit = {
  title: string
  author: string
  space: string
  image: string
  href: string
}

const HITS: ArticleHit[] = [
  {
    title: 'Boha, la cornemuse des Landes de Gascogne',
    author: 'Bohaires de Gasconha, CIRDOC',
    space: 'Musiques',
    image: introMusiques,
    href: '/espaces/musique/boha',
  },
  {
    title: 'Les rondeaux gascons',
    author: 'CIRDOC',
    space: 'Musiques',
    image: uneC,
    href: gabaritPath('musique'),
  },
  {
    title: 'Danses et instruments',
    author: 'CIRDOC',
    space: 'Culture vivante',
    image: uneB,
    href: gabaritPath('fetes'),
  },
  {
    title: 'Célébrer au fil des saisons',
    author: 'CIRDOC',
    space: 'Culture vivante',
    image: uneA,
    href: gabaritPath('fetes'),
  },
  {
    title: 'Les gestes qui se transmettent',
    author: 'CIRDOC',
    space: 'Culture vivante',
    image: uneD,
    href: gabaritPath('fetes'),
  },
  {
    title: 'Alain Cadeillan',
    author: 'CIRDOC',
    space: "Figures d'oc",
    image: introFigures,
    href: gabaritPath('portraits'),
  },
  {
    title: 'Les troubadours et la fin’amor',
    author: 'CIRDOC',
    space: 'Littérature',
    image: introLitterature,
    href: gabaritPath('langue'),
  },
  {
    title: 'Le Larzac, une lutte racontée',
    author: 'CIRDOC',
    space: 'Histoires de…',
    image: introHistoires,
    href: gabaritPath('histoires'),
  },
]

function fold(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
}

export function searchArticles(query: string): ArticleHit[] {
  const tokens = fold(query).split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return []
  return HITS.filter((hit) => {
    const haystack = fold(`${hit.title} ${hit.author} ${hit.space}`)
    return tokens.every((token) => haystack.includes(token))
  })
}

export function articleCountLabel(count: number) {
  if (count === 0) return 'Aucun article'
  if (count === 1) return '1 article'
  return `${count} articles`
}
