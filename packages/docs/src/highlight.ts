import { createHighlighter } from 'shiki'
import { format } from 'prettier'

const highlighterPromise = createHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['html', 'js', 'css'],
})

export async function highlight(code: string, lang = 'html'): Promise<string> {
  const parser = lang === 'html' ? 'html' : lang === 'css' ? 'css' : 'babel'
  const formatted = await format(code, {
    parser,
    printWidth: 100,
    tabWidth: 2,
    singleAttributePerLine: true
  })

  const highlighter = await highlighterPromise
  return highlighter.codeToHtml(formatted.trimEnd(), {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
}
