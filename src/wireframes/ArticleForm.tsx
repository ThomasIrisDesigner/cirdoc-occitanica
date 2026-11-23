import { useState } from 'react'

import { articlesSharingTags } from '@/components/features/EspacePageView'
import { TERRITOIRE_LOCALISATIONS, TERRITOIRE_SOUS_TITRES } from '@/data/territoires'

const SPACES = [
  { value: 'fetes', label: 'Culture vivante' },
  { value: 'langue', label: 'Littérature' },
  { value: 'portraits', label: "Figures d'oc" },
  { value: 'musique', label: 'Musiques' },
  { value: 'histoires', label: 'Histoires de…' },
  { value: 'cadre', label: 'Plein cadre' },
] as const

const CULTURE_TAGS = ['Fêtes', 'Carnaval', 'Sports & jeux', 'Gastronomie', 'Savoir-faire', 'Danses', 'Chants']

const TAGS_BY_SPACE: Record<(typeof SPACES)[number]['value'], string[]> = {
  fetes: CULTURE_TAGS,
  langue: ['Poésie', 'Théâtre', 'Linguistique', 'Contes & fables', 'Récits de vie', 'Chanson'],
  portraits: ['Poètes', 'Musiciens', 'Militants', 'Conteurs'],
  musique: ['Nova cançon', 'Œuvres musicales', 'Chansons actuelles', 'Organologie / Lutherie', 'Collectages'],
  histoires: ['Histoire des idées', 'Politique et société', 'Événements', 'Lieux'],
  cadre: ['Photographie', 'Arts plastiques', 'Cinéma', 'Affiches et éphémères', "Films d'archives"],
}

const TYPES = ['Article', 'Archive', 'Portrait', 'Fiche PCI', 'Ressource', 'Vidéo']

const TERRITOIRE_LABELS: Record<keyof typeof TERRITOIRE_SOUS_TITRES, string> = {
  gascogne: 'Gascogne',
  languedoc: 'Languedoc',
  provence: 'Provence',
  pyrenees: 'Pyrénées',
  limousin: 'Limousin',
  perigord: 'Périgord',
  valdaran: "Val d'Aran",
  dauphine: 'Dauphiné',
}

const CITIES: Record<string, string[]> = Object.fromEntries(
  Object.entries(TERRITOIRE_LOCALISATIONS).map(([key, names]) => [key, names.filter((name) => name !== 'Tout')]),
)

function slug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function citiesFor(places: string[]) {
  const names: string[] = []
  for (const place of places) {
    for (const name of CITIES[place] ?? []) {
      if (!names.includes(name)) names.push(name)
    }
  }
  return names
}

const control =
  'w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus-visible:border-gray-900'

export function ArticleForm() {
  const [space, setSpace] = useState<(typeof SPACES)[number]['value']>('fetes')
  const [tags, setTags] = useState<string[]>(['Fêtes', 'Danses'])
  const [rebonds, setRebonds] = useState<Array<{ space: (typeof SPACES)[number]['value']; label: string }>>([])
  const [reboundSpace, setReboundSpace] = useState<(typeof SPACES)[number]['value']>('musique')
  const [reboundTag, setReboundTag] = useState('Organologie / Lutherie')
  const [places, setPlaces] = useState<string[]>(['gascogne'])
  const [city, setCity] = useState('Pau')
  const [title, setTitle] = useState('Le bal de la fête votive')
  const [links, setLinks] = useState<string[]>(['Le concert de clôture'])
  const [linkDraft, setLinkDraft] = useState('')

  const cities = citiesFor(places)
  const noCityList = places.length > 0 && cities.length === 0
  const classifying = tags.filter((tag) => TAGS_BY_SPACE[space].includes(tag))
  const linked = new Set(links)
  const automatic = articlesSharingTags(space, classifying).filter(
    (card) => card.title !== title && !linked.has(card.title),
  )
  const address = `/espaces/${space}/${slug(title) || 'sans-titre'}`

  function togglePlace(key: string) {
    const next = places.includes(key) ? places.filter((item) => item !== key) : [...places, key]
    setPlaces(next)
    const options = citiesFor(next)
    if (!options.includes(city)) setCity('')
  }

  return (
    <form
      className="max-w-xl space-y-8"
      onSubmit={(event) => event.preventDefault()}
    >
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-gray-900">Rangement</h2>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">Espace</span>
          <select
            required
            className={control}
            value={space}
            onChange={(event) => {
              const next = event.target.value as (typeof SPACES)[number]['value']
              setSpace(next)
              setRebonds((current) => current.filter((item) => item.space !== next))
              if (reboundSpace === next) {
                const other = SPACES.find((item) => item.value !== next)
                if (!other) return
                setReboundSpace(other.value)
                setReboundTag(TAGS_BY_SPACE[other.value][0])
              }
            }}
          >
            {SPACES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="space-y-2">
          <legend className="mb-1.5 text-xs font-semibold text-gray-700">Tags</legend>
          {space === 'fetes' ? (
            <div className="flex flex-wrap gap-2">
              {CULTURE_TAGS.map((tag) => {
                const on = tags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTags(on ? tags.filter((item) => item !== tag) : [...tags, tag])}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      on ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-800'
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-500">Les tags de cet espace ne sont pas arrêtés.</p>
          )}
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="mb-1.5 text-xs font-semibold text-gray-700">Territoires</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(TERRITOIRE_SOUS_TITRES) as Array<keyof typeof TERRITOIRE_SOUS_TITRES>).map((key) => {
              const on = places.includes(key)
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => togglePlace(key)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    on ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-800'
                  }`}
                >
                  {TERRITOIRE_LABELS[key]}
                </button>
              )
            })}
          </div>
        </fieldset>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">Ville</span>
          <select
            className={control}
            value={noCityList ? '' : city}
            disabled={noCityList}
            onChange={(event) => setCity(event.target.value)}
          >
            <option value="">Aucune</option>
            {cities.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {noCityList ? <p className="mt-1.5 text-xs text-gray-500">Ce territoire n’a pas de liste de villes.</p> : null}
        </label>
        <p className="text-xs leading-relaxed text-gray-500">
          Les carrousels se règlent sur la page de l’espace. Ce formulaire ne les demande pas.
        </p>
      </section>

      <section className="space-y-4 border-t border-gray-200 pt-6">
        <h2 className="text-sm font-bold text-gray-900">Article</h2>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">Type</span>
          <select required className={control} defaultValue="Article">
            {TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">Titre</span>
          <input required className={control} value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <p className="text-xs text-gray-500">{address}</p>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">Chapô</span>
          <textarea className={control} rows={2} defaultValue="On y danse en clôture de la fête, sur la place, jusqu’au matin." />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">Signature</span>
          <input className={control} defaultValue="CIRDOC" />
        </label>
      </section>

      <section className="space-y-4 border-t border-gray-200 pt-6">
        <h2 className="text-sm font-bold text-gray-900">Visuel</h2>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">Image</span>
          <input className={control} type="file" accept="image/*" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-gray-700">Légende</span>
            <input className={control} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-gray-700">Crédit</span>
            <input className={control} />
          </label>
        </div>
      </section>

      <section className="space-y-4 border-t border-gray-200 pt-6">
        <h2 className="text-sm font-bold text-gray-900">Texte</h2>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">Corps</span>
          <textarea
            required
            className={control}
            rows={5}
            defaultValue="Le bal réunit les danseurs à la fin de la fête votive. Il se tient à Pau, en Gascogne."
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">À lire aussi</span>
          <input className={control} placeholder="Un article, dans le corps" />
          <p className="mt-1.5 text-xs text-gray-500">Encart dans le corps, avant les sources.</p>
        </label>
      </section>

      <section className="space-y-4 border-t border-gray-200 pt-6">
        <h2 className="text-sm font-bold text-gray-900">Sources</h2>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">Source</span>
          <input className={control} />
        </label>
      </section>

      <section className="space-y-4 border-t border-gray-200 pt-6">
        <h2 className="text-sm font-bold text-gray-900">Rebonds</h2>
        <p className="text-xs leading-relaxed text-gray-500">
          En bas de l’article : d’abord les pastilles, puis les articles liés.
        </p>
        <fieldset className="space-y-2">
          <legend className="mb-1.5 text-xs font-semibold text-gray-700">Pastilles</legend>
          <p className="text-xs leading-relaxed text-gray-500">
            Ajoutées à la main. Au clic, elles ouvrent la page du tag, sans ranger l’article dans cette liste.
          </p>
          {rebonds.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {rebonds.map((item) => (
                <li key={`${item.space}-${item.label}`}>
                  <button
                    type="button"
                    onClick={() => setRebonds(rebonds.filter((rebond) => rebond !== item))}
                    className="rounded-full border border-gray-900 bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    {item.label}
                    <span className="sr-only">, retirer</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
              value={reboundSpace}
              onChange={(event) => {
                const next = event.target.value as (typeof SPACES)[number]['value']
                setReboundSpace(next)
                setReboundTag(TAGS_BY_SPACE[next][0])
              }}
            >
              {SPACES.filter((item) => item.value !== space).map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
              value={reboundTag}
              onChange={(event) => setReboundTag(event.target.value)}
            >
              {TAGS_BY_SPACE[reboundSpace].map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                if (rebonds.some((item) => item.space === reboundSpace && item.label === reboundTag)) return
                setRebonds([...rebonds, { space: reboundSpace, label: reboundTag }])
              }}
              className="rounded border border-gray-900 px-3 py-2 text-xs font-semibold text-gray-900"
            >
              Ajouter
            </button>
          </div>
        </fieldset>
        <div className="space-y-2">
          <span className="block text-xs font-semibold text-gray-700">Articles liés</span>
          <p className="text-xs leading-relaxed text-gray-500">
            Ils passent en premier dans « Autour de cet article », dans l’ordre saisi. Les articles du même tag suivent, sans être demandés ici.
          </p>
          {links.length > 0 ? (
            <ol className="space-y-1">
              {links.map((item, index) => (
                <li key={item} className="flex items-center justify-between gap-3 rounded border border-gray-900 px-3 py-2">
                  <span className="text-sm text-gray-900">
                    {index + 1}. {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLinks(links.filter((link) => link !== item))}
                    className="text-xs font-semibold text-gray-500"
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ol>
          ) : null}
          <div className="flex gap-2">
            <input
              className={control}
              value={linkDraft}
              placeholder="Titre d’un article"
              onChange={(event) => setLinkDraft(event.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                const next = linkDraft.trim()
                if (!next || links.includes(next) || next === title) return
                setLinks([...links, next])
                setLinkDraft('')
              }}
              className="shrink-0 rounded border border-gray-900 px-3 py-2 text-xs font-semibold text-gray-900"
            >
              Ajouter
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <span className="block text-xs font-semibold text-gray-700">Ordre dans « Autour de cet article »</span>
          {links.length === 0 && automatic.length === 0 ? (
            <p className="text-xs text-gray-500">Rien à remonter tant qu’il n’y a ni lien ni tag de classement.</p>
          ) : (
            <ol className="space-y-1">
              {links.map((item) => (
                <li key={`manuel-${item}`} className="flex items-center justify-between gap-3 rounded border border-gray-200 px-3 py-2">
                  <span className="text-sm text-gray-900">{item}</span>
                  <span className="text-xs font-semibold text-gray-900">Lié</span>
                </li>
              ))}
              {automatic.map((card) => (
                <li key={`auto-${card.title}`} className="flex items-center justify-between gap-3 rounded border border-gray-200 px-3 py-2">
                  <span className="text-sm text-gray-600">{card.title}</span>
                  <span className="text-xs text-gray-400">Automatique</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </form>
  )
}
