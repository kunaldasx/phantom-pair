import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const SolutionSection = ({
  title,
  content,
  isLoading,
  currentLanguage
}: {
  title: string
  content: React.ReactNode
  isLoading: boolean
  currentLanguage: string
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (typeof content === 'string') {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center w-full px-4">
        <h2 className="text-[13px] font-medium text-white tracking-wide">{title}</h2>
        {!isLoading && (
          <button
            onClick={copyToClipboard}
            className="text-xs text-white bg-white/10 hover:bg-white/20 rounded px-2 py-1 transition cursor-pointer"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
      {isLoading ? (
        <div className="space-y-1.5">
          <div className="mt-4 flex">
            <p className="text-xs bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text text-transparent animate-pulse">
              Loading solution...
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto z-500">
          <SyntaxHighlighter
            language={currentLanguage === 'golang' ? 'go' : currentLanguage}
            style={dracula}
            showLineNumbers
            wrapLongLines={true}
            customStyle={{
              maxWidth: '100%',
              margin: '0',
              backgroundColor: 'rgba(22, 27, 34, 0.5)',
              overflowX: 'auto',
              padding: '1rem 1.5rem'
            }}
          >
            {content as string}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  )
}
