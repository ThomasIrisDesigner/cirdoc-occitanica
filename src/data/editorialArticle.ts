import type { Screen } from '@/lib/prototypeRoutes'

/**
 * Gabarit éditorial.
 * Un bloc absent (vidéo, citation, territoire…) ne s'affiche pas.
 * Texte d'après la fiche Boha, mondes.occitanica.eu.
 */

const BOHA = '/images/boha-cornemuse-landes.jpg'

export type EditorialBlock =
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

export type EditorialArticleContent = {
  kicker: string
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
  sources?: Array<{ title: string; detail: string }>
  territoire?: { name: string; line: string; screen: Screen }
  portrait?: { name: string; line: string; screen: Screen }
  suggestions: Array<{ type: string; title: string; screen: Screen }>
  maleta?: string
  tags: Array<{ label: string; screen: Screen }>
}

export const EDITORIAL_ARTICLE: EditorialArticleContent = {
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
