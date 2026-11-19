import col1 from '@/assets/home/col-1.png'
import col2 from '@/assets/home/col-2.png'
import col3 from '@/assets/home/col-3.png'
import col4 from '@/assets/home/col-4.png'
import col5 from '@/assets/home/col-5.png'
import col6 from '@/assets/home/col-6.png'
import col7 from '@/assets/home/col-7.png'
import col8 from '@/assets/home/col-8.png'
import col9 from '@/assets/home/col-9.png'
import introMusiques from '@/assets/home/intro-musiques.jpg'
import uneA from '@/assets/home/une-a.png'
import uneB from '@/assets/home/une-b.png'
import uneC from '@/assets/home/une-c.png'
import uneD from '@/assets/home/une-d.png'
import vivaB from '@/assets/home/viva-b.png'

/**
 * Recherche YouTube en attendant l’adresse de la chaîne du CIRDOC.
 * Les cartes du rail Vidéos pointent toutes ici.
 */
export const CIRDOC_YOUTUBE =
  'https://www.youtube.com/results?search_query=CIRDOC+Institut+occitan+de+cultura'

/** Page intermédiaire, résultats Gallica, ou archive externe. */
export type CollectionDestination = 'editorial' | 'gallica' | 'external'

export type CollectionItem = {
  slug: string
  title: string
  /** Effectif déjà formaté, avec espace insécable. */
  count: string
  /** Remplace « N documents » quand la carte n’est pas un fonds Gallica. */
  meta?: string
  image: string
  destination: CollectionDestination
  /** Terme envoyé à Gallica. */
  query: string
  href?: string
  /** Article de une : pas de compteur de documents. */
  article?: boolean
}

export const COLLECTIONS_LEAD: CollectionItem = {
  slug: 'presentation',
  title: 'Présentation de nos collections',
  count: '',
  image: uneA,
  destination: 'editorial',
  query: '',
  article: true,
}

const CULTURE_VIVANTE: CollectionItem = {
  slug: 'culture-vivante',
  title: 'Culture vivante',
  count: '987',
  image: uneB,
  destination: 'editorial',
  query: 'Culture vivante',
}

export const COLLECTIONS_RAILS: Array<{ title: string; items: CollectionItem[] }> = [
  {
    title: 'Par thématique',
    items: [
      CULTURE_VIVANTE,
      {
        slug: 'litterature',
        title: 'Littérature',
        count: '3\u00a0241',
        image: col1,
        destination: 'gallica',
        query: 'Littérature',
      },
      {
        slug: 'figures-oc',
        title: "Figures d'oc",
        count: '2\u00a0134',
        image: col2,
        destination: 'editorial',
        query: "Figures d'oc",
      },
      {
        slug: 'musiques',
        title: 'Musiques',
        count: '1\u00a0876',
        image: col3,
        destination: 'gallica',
        query: 'Musiques',
      },
      {
        slug: 'histoires',
        title: 'Histoires de…',
        count: '640',
        image: col4,
        destination: 'editorial',
        query: 'Histoires',
      },
      {
        slug: 'plein-cadre',
        title: 'Plein cadre',
        count: '418',
        image: col5,
        destination: 'gallica',
        query: 'Plein cadre',
      },
    ],
  },
  {
    title: 'Par territoire',
    items: [
      {
        slug: 'gascogne',
        title: 'Gascogne',
        count: '1\u00a0240',
        image: col6,
        destination: 'editorial',
        query: 'Gascogne',
      },
      {
        slug: 'languedoc',
        title: 'Languedoc',
        count: '2\u00a0180',
        image: col7,
        destination: 'gallica',
        query: 'Languedoc',
      },
      {
        slug: 'pyrenees',
        title: 'Pyrénées',
        count: '890',
        image: col8,
        destination: 'gallica',
        query: 'Pyrénées',
      },
      {
        slug: 'provence',
        title: 'Provence',
        count: '760',
        image: col9,
        destination: 'editorial',
        query: 'Provence',
      },
    ],
  },
  {
    title: 'Vidéos',
    items: [
      {
        slug: 'videos-entretiens',
        title: 'Entretiens',
        count: '',
        meta: 'YouTube',
        image: uneC,
        destination: 'external',
        query: 'Entretiens',
        href: CIRDOC_YOUTUBE,
      },
      {
        slug: 'videos-collectage',
        title: 'Collectage',
        count: '',
        meta: 'YouTube',
        image: introMusiques,
        destination: 'external',
        query: 'Collectage',
        href: CIRDOC_YOUTUBE,
      },
      {
        slug: 'videos-documentaires',
        title: 'Documentaires',
        count: '',
        meta: 'YouTube',
        image: uneD,
        destination: 'external',
        query: 'Documentaires',
        href: CIRDOC_YOUTUBE,
      },
      {
        slug: 'videos-50-ans',
        title: '50 ans',
        count: '',
        meta: 'YouTube',
        image: vivaB,
        destination: 'external',
        query: '50 ans',
        href: CIRDOC_YOUTUBE,
      },
    ],
  },
]

const COLLECTIONS_BY_SLUG = new Map(
  [COLLECTIONS_LEAD, ...COLLECTIONS_RAILS.flatMap((rail) => rail.items)]
    .filter((item) => item.destination === 'editorial')
    .map((item) => [item.slug, item]),
)

export function getCollection(slug: string): CollectionItem | undefined {
  return COLLECTIONS_BY_SLUG.get(slug)
}
