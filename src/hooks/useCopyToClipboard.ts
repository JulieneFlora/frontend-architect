import { useEffect, useRef, useState } from 'react'

export function useCopyToClipboard(resetDelay = 1500) {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timeout.current), [])

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setCopied(false), resetDelay)
  }

  return { copied, copy }
}
