import type { EspaceKey, Screen } from '@/lib/prototypeRoutes'

/**
 * Gabarit éditorial.
 * Un bloc absent (vidéo, citation, territoire…) ne s'affiche pas.
 * Texte d'après la fiche Boha, mondes.occitanica.eu.
 */

const BOHA = '/images/boha-cornemuse-landes.jpg'

type EditorialNote = { note?: string }

export type EditorialBlock = (
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'figure'; src?: string; caption: string; credit: string }
  | {
      type: 'pair'
      leftSrc?: string
      rightSrc?: string
      caption: string
      credit: string
    }
  | {
      type: 'video'
      title: string
      embedSrc: string
      posterSrc?: string
      caption: string
      credit: string
    }
  | {
      type: 'carousel'
      slides: Array<{ src?: string; label: string }>
      caption: string
      credit: string
    }
) &
  EditorialNote

export type EditorialNotes = {
  breadcrumb?: string
  kicker?: string
  title?: string
  chapo?: string
  byline?: string
  meta?: string
  hero?: string
  legend?: string
  sources?: string
  autour?: string
  territoire?: string
  portrait?: string
  suggestions?: string
  maleta?: string
  tags?: string
}

export type EditorialArticleContent = {
  /** Segment d'URL : /espaces/:espace/:slug */
  espace: EspaceKey
  slug: string
  kicker: string
  kickerColorVar: string
  title: string
  chapo: string
  /** Libellés affichés sur la page générique, absents d'un article réel. */
  notes?: EditorialNotes
  /** « Nom, rôle » — le rôle s'affiche après un tiret, comme sur Yroise. */
  author: string
  meta: string
  heroSrc?: string
  heroCaption: string
  heroCredit: string
  blocks: EditorialBlock[]
  enBref?: Array<{ label: string; value: string }>
  sources?: Array<{ title: string; detail: string }>
  territoire?: { name: string; line: string; screen: Screen }
  portrait?: { name: string; line: string; screen: Screen }
  suggestions: Array<{ type: string; title: string; screen: Screen }>
  maleta?: string
  tags: Array<{ label: string; screen: Screen }>
}

export const EDITORIAL_ARTICLE: EditorialArticleContent = {
  espace: 'musique',
  slug: 'boha',
  kicker: 'Article · Musique',
  kickerColorVar: '--occ-espace-musique',
  title: 'Boha',
  chapo: 'Cornemuse des Landes de Gascogne',
  author: 'Bohaires de Gasconha, CIRDOC',
  meta: '6 min de lecture',
  heroSrc: BOHA,
  heroCaption: 'Joueur de boha.',
  heroCredit: 'Photographie · Occitanica',
  blocks: [
    {
      type: 'paragraph',
      text: 'La cornemuse connue aujourd’hui sous le nom de cornemuse des Landes de Gascogne porte plusieurs noms en gascon : boha, bohaussac, chalemina, ou encore bohica. Le plus courant est boha. Il retient le souffle, là où bonlora, plus rare, renvoie au sac.',
    },
    {
      type: 'paragraph',
      text: 'De toutes les cornemuses du domaine français, elle est la seule du type « clarinette ». Son tuyau mélodique a une perce cylindrique et une anche simple. Les autres, comme le hautbois, ont une perce conique et une anche double.',
    },
    {
      type: 'quote',
      text: 'La boha s’en distingue par son type organologique.',
      attribution: 'Fiche Boha · Occitanica',
    },
    { type: 'heading', text: 'Organologie et décoration' },
    {
      type: 'paragraph',
      text: 'Comme toute cornemuse, elle a une réserve d’air, ici une peau de mouton. Deux souches de bois reçoivent le bohet, le tuyau que le musicien met en bouche, et le pihet, le cœur de l’instrument. Le pihet, souvent en buis, porte deux perces : six trous de jeu d’un côté, un seul de l’autre. Ce second tuyau n’est pas un bourdon. C’est un tuyau d’accompagnement.',
    },
    {
      type: 'pair',
      leftSrc: BOHA,
      rightSrc: BOHA,
      caption: 'Le sac et le pihet, sur le même jeu.',
      credit: 'Photographie · Occitanica',
    },
    {
      type: 'paragraph',
      text: 'Les souches et les tuyaux portent deux décors : des incrustations d’étain, qui renforcent aussi le bois, et des motifs gravés rehaussés d’encre rouge, verte ou noire. Géométriques, parfois un oiseau. Les cornemuses anciennes retrouvées en collecte — un peu plus d’une quinzaine — sont toutes dans l’aigu, sans tonalité fixe.',
    },
    { type: 'heading', text: 'Historique' },
    {
      type: 'paragraph',
      text: 'Le plus ancien témoignage qui réponde en partie à la boha est une sculpture de 1522, à l’entrée de l’église d’Arx, dans les Landes. Au XVIIIe siècle, des voyageurs citent la musette dans les Landes de Gascogne. En 1839, le vicomte de Métivier en fait un instrument de berger. En 1912, Félix Arnaudin conforte cette image pastorale.',
    },
    {
      type: 'quote',
      text: 'Un joueur de cornemuse est une bête qui souffle dans la peau d’une autre.',
      attribution: 'Propos de chaire, rapporté par la fiche Boha',
    },
    {
      type: 'paragraph',
      text: 'Très jouée jusqu’en 1914, elle s’éteint peu à peu avec Jeanty Benquet (1870-1957), dernier cornemuseux connu, qui jouait à Bazas, pour les conscrits et les bals de campagne. Dans les années 1970, Alain Cadeillan et d’autres musiciens la remettent à l’honneur.',
    },
    {
      type: 'video',
      title: 'Boha qui pot, ensemble bigourdan',
      embedSrc: 'https://www.youtube-nocookie.com/embed/ky72EffSGPw',
      posterSrc: BOHA,
      caption: 'Ensemble bigourdan de cornemuse des Landes, Boha qui pot.',
      credit: 'Maïté Galindo · YouTube',
    },
    { type: 'heading', text: 'Redécouverte au XXIe siècle' },
    {
      type: 'paragraph',
      text: 'Les bohaires se comptent aujourd’hui par dizaines dans le sud de la France, et bien au-delà. La boha mène des bals, des rues, des concerts. Elle peut gagner un bourdon, ou des trous de plus pour un chromatisme. Elle reste la seule cornemuse française de type clarinette, et elle est vivante.',
    },
    {
      type: 'carousel',
      slides: [
        { src: BOHA, label: 'Le jeu' },
        { src: BOHA, label: 'Le sac' },
        { src: BOHA, label: 'Le pihet' },
      ],
      caption: 'Détails du même cliché : le musicien, la poche, le tuyau.',
      credit: 'Photographie · Occitanica',
    },
  ],
  sources: [
    {
      title: 'Boha, cornemuse des Landes de Gascogne',
      detail: 'Occitanica',
    },
  ],
  territoire: {
    name: 'Gascogne',
    line: 'De Bordeaux aux Pyrénées',
    screen: 'territoire-gascogne',
  },
  portrait: {
    name: 'Jeanty Benquet',
    line: 'Dernier cornemuseux connu. Il joue à Bazas, pour les conscrits et les bals.',
    screen: 'espace-portraits',
  },
  suggestions: [
    { type: 'Article', title: 'Les rondeaux gascons', screen: 'article' },
    { type: 'Fiche PCI', title: 'Danses et instruments', screen: 'espace-fetes' },
    { type: 'Portrait', title: 'Alain Cadeillan', screen: 'espace-portraits' },
  ],
  maleta: 'Écouter une boha en classe',
  tags: [
    { label: 'Musique', screen: 'espace-musique' },
    { label: 'Instruments', screen: 'espace-musique' },
    { label: 'Gascogne', screen: 'territoire-gascogne' },
    { label: 'Landes', screen: 'territoire-gascogne' },
  ],
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'

const LOREM_SHORT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

/** Page générique : mêmes composants, chacun nommé, corps en lorem ipsum. */
export const EDITORIAL_SPECIMEN: EditorialArticleContent = {
  espace: 'musique',
  slug: 'titre-de-l-article',
  kicker: 'Article · Espace',
  kickerColorVar: '--occ-espace-musique',
  title: 'Titre de l’article',
  chapo: LOREM_SHORT,
  author: 'Prénom Nom, Rôle',
  meta: '6 min de lecture',
  heroCaption: 'Légende du visuel principal. Lorem ipsum dolor sit amet.',
  heroCredit: 'Crédit · Source',
  notes: {
    breadcrumb: 'Fil d’Ariane',
    kicker: 'Rubrique',
    title: 'Titre — H1',
    chapo: 'Chapô',
    byline: 'Signature',
    meta: 'Mention',
    hero: 'Visuel',
    legend: 'Légende',
    sources: 'Sources',
    autour: 'Suite de lecture',
    territoire: 'Territoire',
    portrait: 'Portrait lié',
    suggestions: 'À lire ensuite',
    maleta: 'Ressource pédagogique',
    tags: 'Tags',
  },
  blocks: [
    { type: 'paragraph', note: 'Corps', text: LOREM },
    { type: 'paragraph', text: LOREM_SHORT },
    {
      type: 'quote',
      note: 'Citation',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      attribution: 'Source de la citation',
    },
    { type: 'heading', note: 'Intertitre — H2', text: 'Intertitre' },
    { type: 'paragraph', text: LOREM },
    {
      type: 'pair',
      note: 'Paire d’images',
      caption: 'Légende commune aux deux visuels.',
      credit: 'Crédit · Source',
    },
    { type: 'paragraph', text: LOREM_SHORT },
    {
      type: 'video',
      note: 'Vidéo',
      title: 'Titre de la vidéo',
      embedSrc: 'https://www.youtube-nocookie.com/embed/ky72EffSGPw',
      caption: 'Légende de la vidéo. Lorem ipsum dolor sit amet.',
      credit: 'Crédit · Source',
    },
    { type: 'heading', text: 'Deuxième intertitre' },
    { type: 'paragraph', text: LOREM_SHORT },
    {
      type: 'carousel',
      note: 'Carrousel',
      slides: [{ label: 'Visuel 1' }, { label: 'Visuel 2' }, { label: 'Visuel 3' }],
      caption: 'Légende du carrousel. Lorem ipsum dolor sit amet.',
      credit: 'Crédit · Source',
    },
  ],
  sources: [{ title: 'Titre de la source', detail: 'Gallica' }],
  territoire: {
    name: 'Territoire',
    line: 'Sous-titre géographique',
    screen: 'territoire-gascogne',
  },
  portrait: {
    name: 'Prénom Nom',
    line: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    screen: 'espace-portraits',
  },
  suggestions: [
    { type: 'Article', title: 'Titre d’un article lié', screen: 'article' },
    { type: 'Fiche PCI', title: 'Titre d’une fiche liée', screen: 'espace-fetes' },
    { type: 'Portrait', title: 'Titre d’un portrait lié', screen: 'espace-portraits' },
  ],
  maleta: 'Intitulé du lien pédagogique',
  tags: [
    { label: 'Espace', screen: 'espace-musique' },
    { label: 'Territoire', screen: 'territoire-gascogne' },
  ],
}

const ARTICLES = [EDITORIAL_ARTICLE, EDITORIAL_SPECIMEN]

export function articlePath(article: Pick<EditorialArticleContent, 'espace' | 'slug'>): string {
  return `/espaces/${article.espace}/${article.slug}`
}

export function getEditorialArticle(
  espace: string,
  slug: string,
): EditorialArticleContent | undefined {
  return ARTICLES.find((article) => article.espace === espace && article.slug === slug)
}
