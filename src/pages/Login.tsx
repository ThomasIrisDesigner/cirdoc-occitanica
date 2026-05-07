import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LOGIN_ILLUSTRATION } from '@/config/assets'
import { PROJECT_DISPLAY_NAME } from '@/config/project'
import { loginWithPassword } from '@/lib/auth'
import { typography } from '@/styles/typography'

export function Login() {
  const navigate = useNavigate()
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const ok = loginWithPassword(password)
    if (!ok) {
      setError('Mot de passe incorrect.')
      return
    }

    navigate('/prototype', { replace: true })
  }

  return (
    <main className="min-h-dvh bg-primary px-6 py-10 text-surface">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6">
        <Card className="w-full overflow-hidden rounded-2xl border-4 border-cardBorder md:w-[706px] md:max-w-none">
          <div className="flex flex-col gap-10 p-12 md:flex-row md:items-center">
            <div className="w-full md:w-[210px]">
              <div className="aspect-[210/335] w-full overflow-hidden rounded-xl bg-muted/60">
                <img
                  src={LOGIN_ILLUSTRATION.src}
                  alt={LOGIN_ILLUSTRATION.alt}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="w-full md:w-[360px]">
              <CardHeader className="p-0">
                <p className={typography.projectKicker}>{PROJECT_DISPLAY_NAME}</p>
                <h1 className="text-2xl font-semibold leading-[48px] tracking-tight text-text">
                  Accès sécurisé
                </h1>
                <p className={typography.pageSubtitle}>
                  Entrez le mot de passe pour accéder au projet.
                </p>
              </CardHeader>

              <CardContent className="p-0 pt-7">
                <form onSubmit={onSubmit} className="grid gap-7">
                  <div className="grid gap-2">
                    <p className="text-sm font-semibold text-text">Mot de passe</p>
                    <Input
                      autoFocus
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=""
                    />
                    {error ? (
                      <p className="text-xs text-danger">{error}</p>
                    ) : null}
                  </div>

                  <Button type="submit" variant="default" className="h-10 w-full">
                    Se connecter
                  </Button>
                </form>
              </CardContent>
            </div>
          </div>
        </Card>

        <p className="text-sm text-surface/90">© Thomas IRIS — Designer.</p>
      </div>
    </main>
  )
}

