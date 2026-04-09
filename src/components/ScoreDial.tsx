import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'

import type { RiskBand } from '../../shared/analysis'

const BAND_COLORS: Record<RiskBand, string> = {
  Low: '#3dd598',
  Moderate: '#7cc6ff',
  Elevated: '#ffb648',
  High: '#ff6b6b',
}

interface ScoreDialProps {
  band: RiskBand
  score: number
}

export function ScoreDial({ band, score }: ScoreDialProps) {
  return (
    <div className="score-dial">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="68%"
          outerRadius="96%"
          barSize={16}
          data={[{ name: 'risk', value: score, fill: BAND_COLORS[band] }]}
          startAngle={210}
          endAngle={-30}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={16} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="score-dial__center">
        <strong>{score}</strong>
        <span>{band}</span>
      </div>
    </div>
  )
}
