const RULES = [
  {
    title: 'Espace et tags',
    points: [
      'Un article a un seul espace. Il fixe l’URL, le fil d’Ariane et le menu.',
      'Les tags de classement sont ceux de cet espace. Un article peut en avoir plusieurs.',
      'Le même libellé de tag n’existe pas dans deux espaces.',
    ],
  },
  {
    title: 'Page d’un tag',
    points: [
      'Le clic sur un tag remplace À la une et les carrousels par la liste des articles qui ont ce tag.',
      'Une pastille à la fois. Un second clic sur la pastille active revient à la page de l’espace.',
      'L’adresse reste celle de l’espace, avec ?filtre=. Le fil d’Ariane ne descend pas d’un niveau.',
      'Sur cette liste : pas de tag sous le titre, pas de seconde À la une.',
    ],
  },
  {
    title: 'Rebonds',
    points: [
      'Un rebond est une pastille ajoutée à la main, en pied d’article seulement.',
      'Elle ouvre la page du tag. L’article n’entre pas dans cette liste.',
      'La pastille affiche le nom du tag, sans le nom de l’espace.',
    ],
  },
  {
    title: 'Autour de cet article',
    points: [
      'D’abord les articles liés à la main, dans l’ordre du formulaire.',
      'Ensuite, automatiquement, les autres articles du même espace qui partagent au moins un tag de classement.',
      'L’article en cours est exclu. Un article déjà lié à la main n’est pas répété dans la remontée automatique.',
      'Les rebonds ne déclenchent pas cette remontée. Seuls les tags de classement comptent.',
    ],
  },
  {
    title: 'Ce que le formulaire article ne demande pas',
    points: [
      'Les carrousels et À la une se règlent sur la page de l’espace.',
      'Le territoire est un champ à part. Ce n’est pas un tag, et il n’a pas de pastille à côté des tags.',
      '« À lire aussi » est l’encart dans le corps. Ce n’est pas le rail « Autour de cet article ».',
    ],
  },
]

export function ArticleRules() {
  return (
    <div className="max-w-xl space-y-4">
      <p className="text-sm leading-relaxed text-gray-600">
        Règles à transmettre au développement. Elles décrivent le rangement d’un article et ce que le formulaire doit demander.
      </p>
      {RULES.map((rule) => (
        <section key={rule.title} className="space-y-2 rounded border border-gray-300 bg-white p-4">
          <h2 className="text-sm font-bold text-gray-900">{rule.title}</h2>
          <ul className="list-disc space-y-1 pl-4 text-sm leading-relaxed text-gray-700">
            {rule.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
