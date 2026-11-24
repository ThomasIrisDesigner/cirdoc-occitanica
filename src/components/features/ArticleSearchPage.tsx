import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'

import { SearchField } from '@/components/features/SearchPanel'
import { SiteFooter, SiteHeader } from '@/components/features/HomeView'
import { articleCountLabel, searchArticles } from '@/data/articleSearch'
import type { Screen } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-focus))]'

const resultTitle = 'font-ui text-2xl font-bold leading-[1.2]'

export function ArticleSearchPage({
  query,
  onSearch,
  go,
}: {
  query: string
  onSearch: (query: string) => void
  go: (screen: Screen) => void
}) {
  const titleId = useId()
  const [value, setValue] = useState(query)
  const term = query.trim()
  const results = searchArticles(term)

  useEffect(() => {
    setValue(query)
  }, [query])

  return (
    <div className="bg-surface text-text">
      <SiteHeader go={go} onLogo={() => go('home')} />

      <header className="flex flex-col gap-6 bg-[rgb(var(--color-surface-emphasis))] p-6">
        <p id={titleId} className="sr-only">
          Recherche d’articles
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSearch(value.trim())
          }}
        >
          <SearchField
            id={`${titleId}-field`}
            labelledBy={titleId}
            placeholder="Que recherchez-vous ?"
            value={value}
            onChange={setValue}
            submitLabel="Lancer la recherche"
          />
        </form>

        {term && results.length > 0 ? (
          <h1 className={resultTitle}>{articleCountLabel(results.length)}</h1>
        ) : null}

        {!term ? (
          <h1 className={typography.reading}>Saisissez un mot pour chercher un article.</h1>
        ) : null}

        {term && results.length === 0 ? (
          <h1 className={resultTitle}>{articleCountLabel(0)}</h1>
        ) : null}
      </header>

      {results.length > 0 ? (
        <ul className="px-6">
          {results.map((item) => (
            <li key={item.href + item.title} className="border-t border-[rgb(var(--color-border))] first:border-t-0">
              <Link to={item.href} className={`flex items-start gap-3 py-6 ${focusRing}`}>
                <img src={item.image} alt="" className="size-20 shrink-0 object-cover" />
                <span className="min-w-0 flex-1">
                  <span className={`${typography.cardTitleCompact} block`}>{item.title}</span>
                  <span className={`${typography.editorialSecondary} mt-1 block text-[rgb(var(--color-text-secondary))]`}>
                    {item.author}
                  </span>
                  <span className={`${typography.uiCategory} mt-1 block text-[rgb(var(--color-text-brand))]`}>
                    {item.space}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <SiteFooter go={go} />
    </div>
  )
}
