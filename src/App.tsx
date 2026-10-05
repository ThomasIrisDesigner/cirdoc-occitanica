import { Navigate, Route, Routes } from 'react-router-dom'

import { PrototypeLayout } from '@/components/features/PrototypeLayout'
import { DesignSystem } from '@/pages/DesignSystem'
import { Prototype } from '@/pages/Prototype'
import OccitanicaSitemap from '@/wireframes/Occitanica_Sitemap_V3'

export function App() {
  return (
    <Routes>
      <Route
        path="/prototype"
        element={
          <PrototypeLayout>
            <Prototype />
          </PrototypeLayout>
        }
      />

      <Route path="/design-system" element={<DesignSystem />} />

      <Route
        path="/sitemap"
        element={
          <PrototypeLayout alwaysDesktop>
            <OccitanicaSitemap />
          </PrototypeLayout>
        }
      />

      <Route path="*" element={<Navigate to="/prototype" replace />} />
    </Routes>
  )
}
