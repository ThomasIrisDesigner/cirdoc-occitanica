import { Clock } from 'lucide-react'

import { DELIVERY_DATE, PROJECT_DISPLAY_NAME } from '@/config/project'
import { typography } from '@/styles/typography'

export function Prototype() {
  return (
    <main className="min-h-[calc(100dvh-40px)] px-6 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        <header className="space-y-2">
          <p className={typography.projectKicker}>{PROJECT_DISPLAY_NAME}</p>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center text-center pt-16">
          <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-border bg-background">
            <Clock className="h-7 w-7 text-secondary" />
          </div>
          <h1 className={typography.pageTitle}>Interface en cours de construction</h1>
          <p className={typography.pageSubtitle}>
            Livraison prévue : <span className="text-text">{DELIVERY_DATE}</span>
          </p>
        </div>
      </div>
    </main>
  )
}

