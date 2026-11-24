import unePresentation from '@/assets/home/une-a.png'
import slideB from '@/assets/home/une-b.png'
import slideC from '@/assets/home/une-c.png'
import slidePortrait from '@/assets/home/intro-figures.jpg'
import { ESPACE_KEYS, type EspaceKey, type Screen, type TerritoireKey } from '@/lib/prototypeRoutes'

/**
 * Gabarit éditorial.
 * Un bloc absent (vidéo, citation, territoire…) ne s'affiche pas.
 * Texte d'après la fiche Boha, mondes.occitanica.eu.
 */

const BOHA = '/images/boha-cornemuse-landes.jpg'

/** Page parente + filtre pré-sélectionné. */
export function filtrePath(path: string, label: string) {
  return `${path}?filtre=${encodeURIComponent(label)}`
}

export type TextRun = string | { text: string; to: string }

export type EditorialBlock = (
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string | TextRun[] }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'figure'; src?: string; caption: string | TextRun[]; credit: string | TextRun[] }
  | {
      type: 'pair'
      leftSrc?: string
      rightSrc?: string
      caption: string | TextRun[]
      credit: string | TextRun[]
    }
  | {
      type: 'video'
      title: string
      embedSrc: string
      posterSrc?: string
      caption: string | TextRun[]
      credit: string | TextRun[]
      transcript?: string
    }
  | {
      type: 'audio'
      title: string
      src?: string
      /** Durée en secondes, si le fichier n’est pas encore branché. */
      duration?: number
      caption: string | TextRun[]
      credit: string | TextRun[]
      transcript?: string
    }
  | {
      type: 'carousel'
      slides: Array<{
        src?: string
        label: string
        caption: string | TextRun[]
        credit?: string | TextRun[]
      }>
    }
)

export type EditorialArticleContent = {
  /** Segment d'URL : /espaces/:espace/:slug */
  espace: EspaceKey
  slug: string
  /** Type de contenu. Absent du fil d'Ariane : ce n'est pas un niveau d'arborescence. */
  kicker: string
  /** Filtre de la page Espace. Absent si l'article n'est pas rangé dans un sous-espace. */
  sousEspace?: string
  kickerColorVar: string
  title: string
  chapo: string
  /** « Nom, rôle » — le rôle s'affiche après un tiret, comme sur Yroise. */
  author: string
  meta: string
  heroSrc?: string
  heroCaption: string
  heroCredit: string
  blocks: EditorialBlock[]
  enBref?: Array<{ label: string; value: string }>
  /** Titre et précision peuvent porter un lien. Le soulignement reprend la couleur du texte. */
  sources?: Array<{ title: string | TextRun[]; detail?: string | TextRun[] }>
  territoire?: { name: string; line: string; screen: Screen }
  portrait?: { name: string; line: string; screen: Screen }
  /** Encart dans le corps. Distinct du rail « Autour de cet article ». */
  lireAussi?: { title: string; screen: Screen }
  /** Collection numérisée liée. Le titre renvoie à une carte de `collections.ts`. */
  collection?: string
  /**
   * Articles liés à la main pour « Autour de cet article ».
   * Ils s’affichent en premier, dans cet ordre. La remontée par tag suit.
   */
  suggestions: Array<{ title: string; screen: Screen }>
  maleta?: string
  /**
   * Tags de l'espace de l'article. Ils classent l'article et ouvrent sa liste.
   * href ouvre la page du tag. null : la pastille s'affiche, sans navigation.
   */
  tags: Array<{ label: string; href: string | null }>
  /**
   * Pastilles ajoutées à la main, en pied d'article seulement.
   * Elles ouvrent la page du tag, sans ranger l'article dans cette liste.
   */
  rebonds?: Array<{ label: string; href: string }>
}

export const EDITORIAL_ARTICLE: EditorialArticleContent = {
  espace: 'musique',
  slug: 'boha',
  sousEspace: 'Organologie / Lutherie',
  kicker: 'Article',
  kickerColorVar: '--occ-espace-musique',
  title: 'Boha, la cornemuse des Landes de Gascogne',
  chapo:
    'La cornemuse connue aujourd’hui sous le nom de cornemuse des Landes de Gascogne porte plusieurs noms en gascon : boha, bohaussac, chalemina, ou encore bohica. Le plus courant est boha.',
  author: 'Bohaires de Gasconha, CIRDOC',
  meta: '6 min de lecture',
  heroSrc: BOHA,
  heroCaption: 'Joueur de boha.',
  heroCredit: 'Photographie · Occitanica',
  blocks: [
    {
      type: 'paragraph',
      text: 'Il retient le souffle, là où bonlora, plus rare, renvoie au sac. De toutes les cornemuses du domaine français, elle est la seule du type « clarinette ». Son tuyau mélodique a une perce cylindrique et une anche simple. Les autres, comme le hautbois, ont une perce conique et une anche double.',
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
  lireAussi: { title: 'Les rondeaux gascons', screen: 'article' },
  collection: 'Nòva Cançon',
  suggestions: [
    { title: 'Danses et instruments', screen: 'espace-fetes' },
    { title: 'Alain Cadeillan', screen: 'espace-portraits' },
  ],
  maleta: 'Écouter une boha en classe',
  tags: [
    { label: 'Organologie / Lutherie', href: filtrePath('/espaces/musique', 'Organologie / Lutherie') },
  ],
  rebonds: [
    { label: 'Savoir-faire', href: filtrePath('/espaces/fetes', 'Savoir-faire') },
  ],
}

const LOREM_SHORT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

/** Le paragraphe qui précède un composant du gabarit se termine par son nom. */
function before(name: string) {
  return `${LOREM_SHORT} ${name}\u00a0:`
}

/** Même gabarit que la fiche Boha, avec un contenu neutre. */
export const EDITORIAL_SPECIMEN: EditorialArticleContent = {
  espace: 'musique',
  slug: 'titre-de-l-article',
  kicker: 'Article',
  kickerColorVar: '--occ-espace-musique',
  title: 'Titre de l’article',
  chapo: LOREM_SHORT,
  author: 'Prénom Nom, Rôle',
  meta: '6 min de lecture',
  heroCaption: 'Légende du visuel principal. Lorem ipsum dolor sit amet.',
  heroCredit: 'Crédit · Source',
  blocks: [
    {
      type: 'paragraph',
      text: [
        `${LOREM_SHORT} Lien dans le texte\u00a0: `,
        { text: 'Lien souligné', to: '/espaces/musique/boha' },
        '.',
      ],
    },
    { type: 'paragraph', text: before('Citation') },
    {
      type: 'quote',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      attribution: 'Source de la citation',
    },
    { type: 'paragraph', text: before('Intertitre') },
    { type: 'heading', text: 'Intertitre' },
    { type: 'paragraph', text: before('Paire d’images') },
    {
      type: 'pair',
      caption: [
        'Légende commune aux deux visuels. ',
        { text: 'Lien', to: '/espaces/musique/boha' },
      ],
      credit: 'Crédit · Source',
    },
    { type: 'paragraph', text: before('À lire aussi') },
    { type: 'paragraph', text: before('Vidéo') },
    {
      type: 'video',
      title: 'Titre de la vidéo',
      embedSrc: 'https://www.youtube-nocookie.com/embed/ky72EffSGPw',
      caption: 'Légende de la vidéo. Lorem ipsum dolor sit amet.',
      credit: 'Crédit · Source',
      transcript:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    { type: 'paragraph', text: before('Audio') },
    {
      type: 'audio',
      title: 'Titre de l’enregistrement',
      duration: 194,
      caption: 'Titre de l’enregistrement. Lorem ipsum dolor sit amet.',
      credit: 'Crédit · Source',
      transcript: 'Air instrumental, sans parole. [Titre de l’air], joué à la boha par [interprète].',
    },
    { type: 'paragraph', text: before('Carrousel') },
    {
      type: 'carousel',
      slides: [
        {
          src: slideB,
          label: 'Visuel 1',
          caption: 'Légende du premier visuel. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          credit: 'Crédit · Source',
        },
        {
          src: slidePortrait,
          label: 'Visuel 2',
          caption: ['Légende courte. ', { text: 'Lien', to: '/espaces/musique/boha' }],
          credit: 'Crédit · Auteur',
        },
        {
          src: slideC,
          label: 'Visuel 3',
          caption: 'Légende du troisième visuel. Consectetur adipiscing elit.',
          credit: 'Crédit · Source',
        },
      ],
    },
    { type: 'paragraph', text: before('Collection à voir') },
  ],
  sources: [
    {
      title: [
        'Lorem Ipsum — ',
        {
          text: 'Dolor sit amet, consectetur adipiscing elit : sed do eiusmod tempor incididunt ut labore',
          to: '/espaces/musique/boha',
        },
      ],
      detail: '1981, Lorem, Médiathèque dolor sit amet, FB X B778',
    },
    {
      title: ['Auteur — ', { text: 'Titre avec lien vers la source', to: '/espaces/musique/boha' }],
      detail: 'Détails de la référence, lorem ipsum dolor sit amet',
    },
    {
      title: ['Lorem ipsum — ', { text: '29 juillet 1947', to: '/espaces/musique/boha' }],
    },
    {
      title: 'Titre sans lien, lorem ipsum dolor sit amet',
      detail: 'Gallica',
    },
    {
      title: [
        'Auctor — ',
        { text: 'Consectetur adipiscing elit sed do eiusmod', to: '/espaces/musique/boha' },
      ],
      detail: 'Tempor incididunt ut labore et dolore magna aliqua',
    },
  ],
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
  lireAussi: { title: 'Titre d’un article lié, lorem ipsum dolor sit amet', screen: 'article' },
  collection: 'Titre de la collection',
  suggestions: [
    { title: 'Titre d’une fiche liée', screen: 'espace-fetes' },
    { title: 'Titre d’un portrait lié', screen: 'espace-portraits' },
  ],
  maleta: 'Intitulé du lien pédagogique',
  tags: [
    { label: 'Organologie / Lutherie', href: filtrePath('/espaces/musique', 'Organologie / Lutherie') },
    { label: 'Collectages', href: filtrePath('/espaces/musique', 'Collectages') },
  ],
}

/** Article classique ouvert depuis la une de Collections. */
export const PRESENTATION_ARTICLE_PATH = '/articles/presentation-des-collections'

export const PRESENTATION_ARTICLE: EditorialArticleContent = {
  ...EDITORIAL_SPECIMEN,
  slug: 'presentation-des-collections',
  title: 'Présentation de nos collections',
  chapo: 'Les fonds du CIRDOC et de ses partenaires, et la façon de les parcourir.',
  author: 'CIRDOC, Institut occitan de cultura',
  heroSrc: unePresentation,
  tags: [],
  collection: undefined,
  sources: [{ title: 'Titre de la source', detail: 'Gallica' }],
}

const ARTICLES = [EDITORIAL_ARTICLE, EDITORIAL_SPECIMEN]

export function articlePath(article: Pick<EditorialArticleContent, 'espace' | 'slug'>): string {
  return `/espaces/${article.espace}/${article.slug}`
}

/** Gabarit d'exemple. Le sous-espace et le territoire d'origine restent dans l'URL. */
export function gabaritPath(
  espace: EspaceKey,
  sousEspace?: string,
  territoire?: TerritoireKey,
) {
  const params = new URLSearchParams()
  if (sousEspace) params.set('filtre', sousEspace)
  if (territoire) params.set('territoire', territoire)
  const query = params.toString()
  const path = `/espaces/${espace}/${EDITORIAL_SPECIMEN.slug}`
  return query ? `${path}?${query}` : path
}

const SPECIMEN_TAGS: Partial<Record<EspaceKey, string[]>> = {
  fetes: ['Fêtes', 'Carnaval', 'Savoir-faire'],
  langue: ['Poésie', 'Linguistique', 'Contes & fables'],
  musique: ['Organologie / Lutherie', 'Collectages'],
  histoires: ['Histoire des idées', 'Événements', 'Lieux'],
  cadre: ['Photographie', 'Cinéma', "Films d'archives"],
}

export function getEditorialArticle(
  espace: string,
  slug: string,
): EditorialArticleContent | undefined {
  const found = ARTICLES.find((article) => article.espace === espace && article.slug === slug)
  if (found) return found
  if (slug !== EDITORIAL_SPECIMEN.slug) return undefined
  if (!(ESPACE_KEYS as readonly string[]).includes(espace)) return undefined
  const key = espace as EspaceKey
  const tags = (SPECIMEN_TAGS[key] ?? []).map((label) => ({
    label,
    href: filtrePath(`/espaces/${key}`, label),
  }))
  return {
    ...EDITORIAL_SPECIMEN,
    espace: key,
    kickerColorVar: `--occ-espace-${key}`,
    tags,
  }
}
