/**
 * Sous-titres géographiques des pages Territoire.
 * Formulations provisoires — à valider avec le CIRDOC avant mise en production.
 */
export const TERRITOIRE_SOUS_TITRES = {
  gascogne: 'De Bordeaux aux Pyrénées',
  languedoc: 'De Toulouse à la Méditerranée',
  provence: 'De Marseille aux Alpes',
  pyrenees: "De l'Atlantique à la Méditerranée",
  limousin: 'Haute-Vienne, Corrèze et Creuse',
  perigord: 'Dordogne et Lot',
  valdaran: 'Enclave pyrénéenne',
  dauphine: 'Isère, Drôme et Hautes-Alpes',
} as const

export type TerritoireId = keyof typeof TERRITOIRE_SOUS_TITRES

export type TerritoireSection = {
  title: string
  badge: string
}

/**
 * Contenu des quatre pages Territoire déjà routées.
 * L'agenda est conservé mais n'est pas affiché pour le moment.
 */
export const TERRITOIRES_CONFIG: Record<
  'gascogne' | 'languedoc' | 'pyrenees' | 'provence',
  {
    label: string
    docsCount: string
    sections: TerritoireSection[]
    hasAgenda: boolean
    agendaItems: Array<{ date: string; lieu: string; title: string }>
  }
> = {
  gascogne: {
    label: 'Gascogne',
    docsCount: '1 240',
    sections: [
      { title: 'Musique', badge: 'Archive' },
      { title: 'Fêtes & Traditions', badge: 'PCI' },
      { title: 'Personnalités', badge: 'Portrait' },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: '08 août', lieu: 'Dax', title: 'Fêtes de Dax' },
      { date: '15 août', lieu: 'Mont-de-Marsan', title: 'Festival des Landes' },
    ],
  },
  languedoc: {
    label: 'Languedoc',
    docsCount: '2 180',
    sections: [
      { title: 'Langue', badge: 'Article' },
      { title: 'Fêtes & Traditions', badge: 'PCI' },
      { title: 'La Scène', badge: 'Article' },
      { title: 'Personnalités', badge: 'Portrait' },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: '12 juil.', lieu: 'Montpellier', title: 'Canto lo Vent' },
      { date: '3 août', lieu: 'Béziers', title: 'Festival occitan' },
    ],
  },
  pyrenees: {
    label: 'Pyrénées',
    docsCount: '890',
    sections: [
      { title: 'Musique', badge: 'Archive' },
      { title: 'Fêtes & Traditions', badge: 'PCI' },
      { title: 'Personnalités', badge: 'Portrait' },
    ],
    hasAgenda: false,
    agendaItems: [],
  },
  provence: {
    label: 'Provence',
    docsCount: '760',
    sections: [
      { title: 'Langue', badge: 'Article' },
      { title: 'Portraits', badge: 'Portrait' },
      { title: 'La Scène', badge: 'Article' },
      { title: 'Personnalités', badge: 'Portrait' },
    ],
    hasAgenda: true,
    agendaItems: [{ date: '5 juil.', lieu: 'Aix-en-Provence', title: 'Fèsto Vierginenco' }],
  },
}

export const TERRITOIRE_LOCALISATIONS: Record<keyof typeof TERRITOIRES_CONFIG, string[]> = {
  gascogne: ['Tout', 'Auch', 'Bordeaux', 'Pau', 'Bayonne', 'Gers'],
  languedoc: ['Tout', 'Toulouse', 'Montpellier', 'Nîmes', 'Carcassonne'],
  provence: ['Tout', 'Marseille', 'Aix-en-Provence', 'Arles', 'Nice'],
  pyrenees: ['Tout', 'Foix', 'Tarbes', 'Perpignan'],
}
