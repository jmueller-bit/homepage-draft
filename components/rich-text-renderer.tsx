import React from 'react'

interface RichTextNode {
  nodeType: string
  value?: string
  content?: RichTextNode[]
  marks?: { type: string }[]
  data?: any
}

interface RichTextDocument {
  nodeType: 'document'
  content: RichTextNode[]
}

/**
 * Konvertiert Contentful RichText zu React-Elementen
 * Unterstützt: Überschriften, Absätze, Listen, Links, Formatierungen
 */
export function renderRichText(richText: RichTextDocument | any): React.ReactNode {
  if (!richText || typeof richText !== 'object') {
    return null
  }

  if (richText.nodeType !== 'document' || !Array.isArray(richText.content)) {
    return String(richText)
  }

  return <>{richText.content.map((node: RichTextNode, index: number) => renderNode(node, index))}</>
}

function renderNode(node: RichTextNode, index: number): React.ReactNode {
  if (!node) return null

  const key = `${node.nodeType}-${index}`

  switch (node.nodeType) {
    case 'paragraph':
      return (
        <p key={key} className="mb-4 last:mb-0">
          {node.content?.map((child, i) => renderInlineNode(child, i))}
        </p>
      )

    case 'heading-1':
      return (
        <h1 key={key} className="text-3xl font-bold mb-4 mt-6">
          {node.content?.map((child, i) => renderInlineNode(child, i))}
        </h1>
      )

    case 'heading-2':
      return (
        <h2 key={key} className="text-2xl font-bold mb-3 mt-5">
          {node.content?.map((child, i) => renderInlineNode(child, i))}
        </h2>
      )

    case 'heading-3':
      return (
        <h3 key={key} className="text-xl font-bold mb-2 mt-4">
          {node.content?.map((child, i) => renderInlineNode(child, i))}
        </h3>
      )

    case 'heading-4':
      return (
        <h4 key={key} className="text-lg font-bold mb-2 mt-3">
          {node.content?.map((child, i) => renderInlineNode(child, i))}
        </h4>
      )

    case 'heading-5':
    case 'heading-6':
      return (
        <h5 key={key} className="text-base font-bold mb-2 mt-3">
          {node.content?.map((child, i) => renderInlineNode(child, i))}
        </h5>
      )

    case 'unordered-list':
      return (
        <ul key={key} className="list-disc list-inside mb-4 space-y-1">
          {node.content?.map((child, i) => renderNode(child, i))}
        </ul>
      )

    case 'ordered-list':
      return (
        <ol key={key} className="list-decimal list-inside mb-4 space-y-1">
          {node.content?.map((child, i) => renderNode(child, i))}
        </ol>
      )

    case 'list-item':
      return (
        <li key={key} className="ml-4">
          {node.content?.map((child, i) => renderInlineNode(child, i))}
        </li>
      )

    case 'blockquote':
      return (
        <blockquote key={key} className="border-l-4 border-primary pl-4 italic my-4">
          {node.content?.map((child, i) => renderNode(child, i))}
        </blockquote>
      )

    case 'hr':
      return <hr key={key} className="my-6 border-t border-gray-200" />

    case 'hyperlink':
      const url = node.data?.uri || '#'
      return (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {node.content?.map((child, i) => renderInlineNode(child, i))}
        </a>
      )

    case 'table':
      return (
        <table key={key} className="w-full border-collapse mb-4">
          <tbody>
            {node.content?.map((row, i) => (
              <tr key={i} className="border-b">
                {row.content?.map((cell: any, j: number) => (
                  <td key={j} className="py-2 px-4 border">
                    {cell.content?.map((child: any, k: number) => renderNode(child, k))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )

    default:
      // Versuche, den Inhalt als Text zu rendern
      if (node.content) {
        return <span key={key}>{node.content.map((child, i) => renderNode(child, i))}</span>
      }
      return null
  }
}

function renderInlineNode(node: RichTextNode, index: number): React.ReactNode {
  if (!node) return null

  const key = `inline-${index}`

  if (node.nodeType === 'text') {
    let content: React.ReactNode = node.value || ''

    // Wende Formatierungen an
    if (node.marks && node.marks.length > 0) {
      node.marks.forEach((mark) => {
        switch (mark.type) {
          case 'bold':
            content = <strong key={key}>{content}</strong>
            break
          case 'italic':
            content = <em key={key}>{content}</em>
            break
          case 'underline':
            content = <u key={key}>{content}</u>
            break
          case 'code':
            content = <code key={key} className="bg-gray-100 px-1 py-0.5 rounded text-sm">{content}</code>
            break
          case 'strikethrough':
            content = <del key={key}>{content}</del>
            break
          case 'superscript':
            content = <sup key={key}>{content}</sup>
            break
          case 'subscript':
            content = <sub key={key}>{content}</sub>
            break
        }
      })
    }

    return <span key={key}>{content}</span>
  }

  // Für verschachtelte Elemente (z.B. Links in Listen)
  return renderNode(node, index)
}

/**
 * Konvertiert RichText zu reinem Text (für Meta-Beschreibungen etc.)
 */
export function richTextToPlainText(richText: RichTextDocument | any): string {
  if (!richText || typeof richText !== 'object') {
    return String(richText || '')
  }

  if (richText.nodeType !== 'document' || !Array.isArray(richText.content)) {
    return String(richText)
  }

  const extractText = (nodes: RichTextNode[]): string => {
    return nodes
      .map((node) => {
        if (node.nodeType === 'text') {
          return node.value || ''
        }
        if (node.content && Array.isArray(node.content)) {
          return extractText(node.content)
        }
        return ''
      })
      .join('')
      .trim()
  }

  return extractText(richText.content)
}
