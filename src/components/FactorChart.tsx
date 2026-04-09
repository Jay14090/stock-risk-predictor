import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { RiskFactor } from '../../shared/analysis'

const SIGNAL_COLORS = {
  supportive: '#3dd598',
  watch: '#ffb648',
  stressed: '#ff6b6b',
}

interface FactorChartProps {
  factors: RiskFactor[]
}

export function FactorChart({ factors }: FactorChartProps) {
  return (
    <div className="factor-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={[...factors].reverse()} layout="vertical" margin={{ left: 8, right: 16 }}>
          <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.08)" />
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis
            type="category"
            dataKey="label"
            width={120}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'rgba(228, 230, 239, 0.72)', fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={{
              background: '#11141d',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
            }}
          />
          <Bar dataKey="score" radius={[10, 10, 10, 10]}>
            {factors
              .slice()
              .reverse()
              .map((factor) => (
                <Cell key={factor.key} fill={SIGNAL_COLORS[factor.signal]} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
