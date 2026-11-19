import { SiteFooter, SiteHeader } from '@/components/features/HomeView'
import type { Screen } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

export function PartenairesView({ go }: { go: (screen: Screen) => void }) {
  return (
    <div className="bg-[rgb(var(--color-background-warm))] text-text">
      <SiteHeader go={go} onLogo={() => go('home')} />
      <section className="px-4 pb-10 pt-8">
        <h1 className={typography.title}>Partenaires</h1>
      </section>
      <SiteFooter go={go} />
    </div>
  )
}
