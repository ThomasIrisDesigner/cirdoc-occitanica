import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { PrototypeLayout } from '@/components/features/PrototypeLayout'
import { DesignSystem } from '@/pages/DesignSystem'
import { Prototype } from '@/pages/Prototype'
import OccitanicaSitemap from '@/wireframes/Occitanica_Sitemap_V3'

function PrototypeChrome() {
  return (
    <PrototypeLayout>
      <Outlet />
    </PrototypeLayout>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/design-system" element={<DesignSystem />} />

      <Route
        path="/sitemap"
        element={
          <PrototypeLayout alwaysDesktop>
            <OccitanicaSitemap />
          </PrototypeLayout>
        }
      />

      <Route element={<PrototypeChrome />}>
        <Route path="/" element={<Prototype />} />
        <Route path="/menu" element={<Prototype />} />
        <Route path="/collections" element={<Prototype />} />
        <Route path="/article" element={<Prototype />} />
        <Route path="/espaces/:espace" element={<Prototype />} />
        <Route path="/territoires/:territoire" element={<Prototype />} />
      </Route>

      <Route path="/prototype" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
