import { Check, Copy } from 'lucide-react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

SyntaxHighlighter.registerLanguage('tsx', tsx)

export function CodeBlock({ code }: { code: string }) {
  const { copied, copy } = useCopyToClipboard()
  return (
    <div className="relative overflow-hidden rounded-lg border border-[#26262e] bg-[#0b0b0e] pb-9">
      <SyntaxHighlighter
        language="tsx"
        style={oneDark}
        customStyle={{
          margin: 0,
          background: 'transparent',
          padding: '1rem',
          fontSize: '0.75rem',
          lineHeight: 1.7,
        }}
        codeTagProps={{ style: { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" } }}
      >
        {code}
      </SyntaxHighlighter>
      <button
        type="button"
        onClick={() => copy(code)}
        className="absolute right-4 bottom-3 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-[#5f5f6a] uppercase hover:text-white"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? 'copiado' : 'copy code'}
      </button>
    </div>
  )
}
