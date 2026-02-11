import { GithubActions } from '@/components/GithubActions'
import { Disclaimer } from '@/components/header/Disclaimer'
import { TitleSection } from '@/components/header/TitleSection'

export function Header() {
  return (
    <div className="space-y-6 mb-12">
      <Disclaimer />

      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <TitleSection />

        <div className="shrink-0">
          <GithubActions />
        </div>
      </header>
    </div>
  )
}
