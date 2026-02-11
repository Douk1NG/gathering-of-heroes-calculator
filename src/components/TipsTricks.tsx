import { Info } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { t } from '@/lib/utils'
import { T } from '@/translations'

export function TipsTricks() {
  return (
    <Card className="h-full border-white/5 bg-white/2 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="w-4 h-4 text-yellow-500" />
          {t(T.tipsTricks.title)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-neutral-400 leading-relaxed">
        <p>
          {t(T.tipsTricks.tip1.part1)}{' '}
          <span className="text-blue-400 font-medium">{t(T.tipsTricks.tip1.part2)}</span>{' '}
          {t(T.tipsTricks.tip1.part3)}{' '}
          <span className="text-blue-400 font-medium">{t(T.tipsTricks.tip1.part4)}</span>
        </p>
        <p>
          {t(T.tipsTricks.tip2.part1)}{' '}
          <span className="text-blue-400 font-medium">{t(T.tipsTricks.tip2.part2)}</span>
        </p>
      </CardContent>
    </Card>
  )
}
