import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { BuilderPage } from './BuilderPage'
describe('BuilderPage', () => {
  it('permite concluir o fluxo e mostra o resultado', async () => {
    const user = userEvent.setup()
    render(<BuilderPage />)
    await user.click(screen.getByRole('button', { name: /continuar/i }))
    await user.click(screen.getByRole('button', { name: /gerar arquitetura/i }))
    expect(screen.getByText('resultado')).toBeInTheDocument()
    expect(screen.getByText(/estrutura sugerida/i)).toBeInTheDocument()
  })
})
