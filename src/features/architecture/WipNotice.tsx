import { icons3d } from '../../assets/icons-3d'

export function WipNotice() {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning-light p-4">
      <img src={icons3d.hourglassNotDone} alt="" className="h-9 w-9 shrink-0" />
      <p className="text-sm leading-6 text-fg-muted">
        <strong className="text-fg">Ainda em construção:</strong> o recomendador já funciona, mas as regras
        por trás das sugestões ainda estão sendo ajustadas. Sinta-se à vontade para explorar, só não leve o
        resultado como palavra final por enquanto.
      </p>
    </div>
  )
}
