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
import ytFrancois from '@/assets/collections/yt-francois.jpg'
import ytKaufmann from '@/assets/collections/yt-kaufmann.jpg'
import ytMarchand from '@/assets/collections/yt-marchand.jpg'
import ytMarti from '@/assets/collections/yt-marti.jpg'
import { gallicaResultsUrl } from '@/lib/gallica'

/** Chaîne CIRDOC – Institut occitan de cultura. */
export const CIRDOC_YOUTUBE = 'https://www.youtube.com/@cirdoc-institut-occitan'

/** Page éditoriale d'une collection riche. Les autres vignettes ouvrent Gallica. */
export const LARZAC_COLLECTION_PATH = '/collections/lutte-du-larzac'

export const YOUTUBE_FRAMES = [ytKaufmann, ytMarti, ytMarchand, ytFrancois]

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

const PHOTOS = [uneB, uneC, uneD, col1, col2, col3, col4, col5, col6, col7, col8, col9, introMusiques, vivaB]
let photoCursor = 0

function nextPhoto() {
  const image = PHOTOS[photoCursor % PHOTOS.length]
  photoCursor += 1
  return image
}

/** Chiffres fictifs, en attendant les effectifs réels. */
function documents(count: number) {
  const formatted = new Intl.NumberFormat('fr-FR').format(count).replace(/\s/g, '\u00a0')
  return `${formatted} documents`
}

export type RemarkableDocument = {
  title: string
  collection: string
  image: string
  href: '#'
}

export type CollectionCard = {
  title: string
  documents: string
  image: string
  href: '#'
}

export type ImageCollection = {
  title: string
  description: string
  image: string
  href: '#'
}

export const DOCUMENTS_REMARQUABLES: RemarkableDocument[] = [
  { title: 'Affiche du 1er festival de Pau, 1964', collection: "À l'affiche !", image: nextPhoto(), href: '#' },
  { title: 'Manuscrit de troubadour, XIIe siècle', collection: 'Troubadours', image: nextPhoto(), href: '#' },
  { title: 'Enregistrement Félix Arnaudin, 1897', collection: 'Archives orales', image: nextPhoto(), href: '#' },
]

export const COLLECTIONS_PHARES: CollectionCard[] = [
  { title: 'Lutte du Larzac', documents: '342 documents', image: nextPhoto(), href: LARZAC_COLLECTION_PATH },
  { title: 'Nòva Cançon', documents: '218 documents', image: nextPhoto(), href: gallicaResultsUrl('Nòva Cançon') },
  { title: 'Carnaval', documents: '156 documents', image: nextPhoto(), href: gallicaResultsUrl('Carnaval') },
  { title: 'Militantisme', documents: '487 documents', image: nextPhoto(), href: gallicaResultsUrl('Militantisme') },
]

function themeCard(title: string, count: number, href = gallicaResultsUrl(title)): CollectionCard {
  return { title, documents: documents(count), image: nextPhoto(), href }
}

export const COLLECTION_THEMES: Array<{ title: string; items: CollectionCard[] }> = [
  {
    title: 'Langue et littérature',
    items: [
      themeCard('Troubadours', 186),
      themeCard('Concours de langue romane', 74),
      themeCard('Dictionnaires, lexiques et glossaires', 129),
      themeCard('Grammaires', 63),
      themeCard('Des contes et des fables', 210),
      themeCard('Théâtre occitan', 98),
      themeCard('Textes sacrés', 41),
    ],
  },
  {
    title: 'Mémoires et société',
    items: [
      themeCard('Militantisme', 487),
      themeCard('Lutte du Larzac', 342, LARZAC_COLLECTION_PATH),
      themeCard('Crise viticole de 1907', 88),
      themeCard('Première Guerre mondiale', 203),
      themeCard('Journaux de guerre', 67),
      themeCard('Archives orales', 312),
    ],
  },
  {
    title: 'Musique et culture vivante',
    items: [
      themeCard('Nòva Cançon', 218),
      themeCard('Chansons et partitions', 540),
      themeCard('Radios occitanes', 126),
      themeCard('Archives chantées', 274),
      themeCard('Carnaval', 156),
      themeCard('Nadal', 49),
      themeCard('Gastronomie', 183),
      themeCard('Sports et jeux', 72),
    ],
  },
  {
    title: 'Presse et publications',
    items: [
      themeCard('Presse occitane', 890),
      themeCard('Presse félibréenne', 146),
      themeCard('Almanachs', 58),
    ],
  },
]

export const EN_IMAGES: ImageCollection[] = [
  { title: "À l'affiche !", description: 'Affiches militantes et culturelles', image: nextPhoto(), href: gallicaResultsUrl("À l'affiche !") },
  { title: 'Tracts et éphémères', description: 'Documents imprimés du mouvement occitan', image: nextPhoto(), href: gallicaResultsUrl('Tracts et éphémères') },
  { title: 'Cinéma et archives filmées', description: 'Films et documentaires', image: nextPhoto(), href: gallicaResultsUrl('Cinéma et archives filmées') },
  { title: 'Lutte du Larzac — Affiches', description: 'Sous-collection affiches du Larzac', image: nextPhoto(), href: gallicaResultsUrl('Lutte du Larzac affiches') },
]

export const FONDS_ARCHIVES = [
  'Société archéologique de Béziers',
  'Fonds Junior Sans',
  "Fonds Ràdio Lenga d'Òc",
  'Fonds [nom radio à compléter]',
]

const COLLECTIONS_BY_SLUG = new Map([[COLLECTIONS_LEAD.slug, COLLECTIONS_LEAD]])

export function getCollection(slug: string): CollectionItem | undefined {
  return COLLECTIONS_BY_SLUG.get(slug)
}

/** Carte neutre du gabarit d'article. */
const SPECIMEN_COLLECTION: CollectionCard = {
  title: 'Titre de la collection',
  documents: documents(120),
  image: uneB,
  href: '#',
}

/** Carte d'une collection, pour l'encart dans un article. */
export function findCollectionCard(title: string): CollectionCard | undefined {
  if (title === SPECIMEN_COLLECTION.title) return SPECIMEN_COLLECTION
  return (
    COLLECTIONS_PHARES.find((item) => item.title === title) ??
    COLLECTION_THEMES.flatMap((theme) => theme.items).find((item) => item.title === title)
  )
}
