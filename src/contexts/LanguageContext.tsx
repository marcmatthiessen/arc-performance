import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
type Lang = 'en' | 'pt' | 'de'
interface LangCtx { lang: Lang; setLang: (l: Lang) => void }
const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {} })
export const useLanguage = () => useContext(Ctx)
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}
