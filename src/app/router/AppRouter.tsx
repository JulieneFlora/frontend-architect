import { Navigate, Route, Routes } from 'react-router'
import { Layout } from '../../components/layout/Layout'
import { HomePage } from '../../features/home/HomePage'
import { BuilderPage } from '../../features/architecture/BuilderPage'
import { LibraryPage } from '../../features/library/LibraryPage'
import { LibraryDetailPage } from '../../features/library/LibraryDetailPage'
import { ManualPage } from '../../features/manual/ManualPage'
export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/biblioteca" element={<LibraryPage />} />
        <Route path="/biblioteca/:id" element={<LibraryDetailPage />} />
        <Route path="/manual" element={<ManualPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
