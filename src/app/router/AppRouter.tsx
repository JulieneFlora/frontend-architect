import { Navigate, Route, Routes } from 'react-router'
import { Layout } from '../../components/layout/Layout'
import { HomePage } from '../../features/home/HomePage'
import { BuilderPage } from '../../features/architecture/BuilderPage'
import { LibraryPage } from '../../features/library/LibraryPage'
import { LibraryDetailPage } from '../../features/library/LibraryDetailPage'
export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/explorar" element={<LibraryPage />} />
        <Route path="/explorar/:id" element={<LibraryDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
