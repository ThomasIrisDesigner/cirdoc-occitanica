import type { EditorialBlock } from '@/data/editorialArticle'
import { INSTITUTION_SLUGS, type InstitutionSlug } from '@/lib/prototypeRoutes'

/**
 * Pages du pied de page.
 * Même gabarit qu’un article : bandeau optionnel, pas d’auteur, pas de rebonds.
 * Le fil d’Ariane remonte à l’accueil. Ces pages ne sont pas des articles d’espace.
 */

export type InstitutionPageContent = {
  slug: InstitutionSlug
  title: string
  chapo: string
  heroSrc?: string
  blocks: EditorialBlock[]
}

const P1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const P2 =
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
const P3 =
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
const P4 =
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

function page(
  slug: InstitutionSlug,
  title: string,
  first: string,
  second: string,
): InstitutionPageContent {
  return {
    slug,
    title,
    chapo: P1,
    blocks: [
      { type: 'heading', text: first },
      { type: 'paragraph', text: P2 },
      { type: 'paragraph', text: P3 },
      { type: 'heading', text: second },
      { type: 'paragraph', text: P4 },
      { type: 'paragraph', text: P2 },
    ],
  }
}

export const INSTITUTION_PAGES: InstitutionPageContent[] = [
  page('partenaires', 'Partenaires', 'Lorem ipsum', 'Consectetur adipiscing'),
  page('mentions-legales', 'Mentions légales et crédits', 'Sed do eiusmod', 'Tempor incididunt'),
  page('entrepot-oai-pmh', 'Entrepôt OAI-PMH', 'Ut enim ad minim', 'Quis nostrud exercitation'),
  page('cookies', 'Informations sur les cookies', 'Duis aute irure', 'Velit esse cillum'),
  page('conditions-d-utilisation', 'Conditions d’utilisation', 'Excepteur sint occaecat', 'Sunt in culpa'),
  page('donnees-personnelles', 'Données personnelles', 'Officia deserunt', 'Mollit anim id est'),
]

export function getInstitutionPage(slug: string): InstitutionPageContent | undefined {
  if (!(INSTITUTION_SLUGS as readonly string[]).includes(slug)) return undefined
  return INSTITUTION_PAGES.find((item) => item.slug === slug)
}
