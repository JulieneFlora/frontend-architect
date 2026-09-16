import { useState } from 'react'
import { BuilderResult } from './BuilderResult'
import { BuilderWizard, stepCount } from './BuilderWizard'
import { defaults, type ArchitectureChoices } from './domain'
import { generateRecommendation } from './recommendationEngine'

export function BuilderPage() {
  const [step, setStep] = useState(0)
  const [choices, setChoices] = useState<ArchitectureChoices>(defaults)

  if (step === stepCount)
    return (
      <BuilderResult result={generateRecommendation(choices)} choices={choices} onReview={() => setStep(0)} />
    )

  return <BuilderWizard step={step} choices={choices} onChange={setChoices} onStepChange={setStep} />
}
