import { Link } from 'react-router-dom'

import { typography } from '@/styles/typography'

const screens = [
  ['Accueil', 'Page d’accueil', 'occ-header, occ-gutter-page, occ-button, occ-space-card, occ-mark, occ-chip occ-chip-territoire, occ-footer. Toute la carte À la Une est le lien. Au survol d’un espace, la seconde image du visuel apparaît en fondu. Le fond de la tuile ne change pas.'],
  ['Espace', 'Page éditoriale', 'occ-gutter-page, occ-chip, type-title, type-ui-category. Un filtre à la fois.'],
  ['Territoire', 'Page éditoriale', 'Même gouttière que l’espace. Le lieu est le libellé de carte, pas une pastille de plus.'],
  ['Article', 'Page de texte', 'occ-article-header et occ-article-body. La marge de 24 px est déjà dedans. Titre 34 px.'],
  ['Pied de page', 'Page de texte', 'Même gabarit que l’article. Fil d’Ariane : Accueil. Sans image, le bandeau ne s’affiche pas. Pas d’auteur, pas de rebonds.'],
  ['Collection éditoriale', 'Page de texte', 'Même gabarit que l’article, plus occ-documents sous le titre.'],
  ['Collections', 'Page d’accueil du fonds', 'Fond #222120, gouttière de page. Les vignettes de rail ouvrent Gallica, sauf la page éditoriale.'],
  ['Recherche d’articles', 'Page de texte', 'occ-search-header, occ-field, type-result (24 px), occ-result. Pas de filtre.'],
]

export function Integration() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 text-text">
      <p className="type-ui-category text-[rgb(var(--color-text-brand))]">Intégration</p>
      <h1 className="type-title mt-3">Charte Occitanica</h1>
      <p className="type-editorial-lead mt-4 text-[rgb(var(--color-text-secondary))]">
        Mobile validé. Le desktop viendra dans le même fichier, en bas. Les chiffres sont ici : ne pas les reprendre à la pipette dans les écrans.
      </p>

      <section className="mt-10">
        <h2 className="type-heading">Télécharger</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className={`${typography.uiAction} inline-flex h-11 items-center bg-action px-4 text-[rgb(var(--color-action-content))] no-underline`}
            href="/integration/occitanica.zip"
          >
            Dossier complet
          </a>
          <a className="type-footer-title text-[rgb(var(--color-text-brand))] underline" href="/integration/occitanica.css">
            La feuille CSS seule
          </a>
        </div>
        <p className="type-ui-caption mt-3 text-[rgb(var(--color-text-secondary))]">
          Le dossier contient <span className="font-semibold">occitanica.css</span>, les deux polices et leurs licences. Garder <span className="font-semibold">fonts/</span> à côté de la feuille : les chemins sont relatifs.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="type-heading">Comment s’en servir</h2>
        <p className="type-reading mt-4">
          Poser la classe du fichier sur le bloc Twig. <span className="font-semibold">type-title</span> est le titre de page, <span className="font-semibold">occ-gutter-page</span> la marge de 16 px, <span className="font-semibold">occ-gutter-prose</span> celle de 24 px. Les deux marges coexistent.
        </p>
        <p className="type-reading mt-4">
          Dans les écrans du prototype, les classes <span className="font-semibold">px-4</span>, <span className="font-semibold">gap-6</span> ou <span className="font-semibold">bg-action</span> sont internes. Elles ne vont pas dans le thème.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="type-heading">Pages</h2>
        <ul className="mt-4 divide-y divide-[rgb(var(--color-sand))] border-y border-[rgb(var(--color-sand))]">
          {screens.map(([screen, kind, use]) => (
            <li key={screen} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
              <p className="type-footer-title">{screen}</p>
              <p className="type-ui-caption text-[rgb(var(--color-text-secondary))]">
                <span className="text-text">{kind}.</span> {use}
              </p>
            </li>
          ))}
        </ul>
        <p className="type-ui-caption mt-4 text-[rgb(var(--color-text-secondary))]">
          La recherche dans les documents, la liste de résultats Gallica et le visualiseur ne se redessinent pas. On y paramètre les couleurs et le logo.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="type-heading">À laisser</h2>
        <p className="type-reading mt-4">
          La barre noire du prototype, les écrans encore en wireframe, et la page <Link className="underline" to="/design-system">Design system</Link>. Cette dernière sert à voir le rendu. Les valeurs à intégrer sont dans le fichier CSS.
        </p>
      </section>
    </div>
  )
}
