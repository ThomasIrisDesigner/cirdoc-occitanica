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
