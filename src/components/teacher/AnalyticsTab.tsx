import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUpIcon } from 'lucide-react';
import { attentionLearners, kpis, primaryKpi, topicMastery, weeklyActivity } from '../../data/teacher';
import { useTheme } from '../../contexts/ThemeContext';

function masteryColor(v: number) {
  if (v >= 70) return 'bg-success';
  if (v >= 50) return 'bg-primary';
  return 'bg-warn';
}

export function AnalyticsTab() {
  const { theme } = useTheme();
  const c =
  theme === 'light' ?
  { grid: '#E2E8F0', axis: '#64748B', cursor: '#F1F5F9', bg: '#FFFFFF', border: '#E2E8F0', label: '#0F172A' } :
  { grid: '#1E293B', axis: '#64748B', cursor: '#1E293B', bg: '#0F172A', border: '#1E293B', label: '#F8FAFC' };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="glass-card p-4">
          <p className="text-sm text-slate-400">{primaryKpi.label}</p>
          <div className="mt-1 flex items-baseline gap-3">
            <p className="text-4xl font-semibold tracking-tight">{primaryKpi.value}</p>
            <p className="flex items-center gap-1 text-sm text-success-soft">
              <TrendingUpIcon className="h-4 w-4" /> {primaryKpi.delta}
            </p>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-success" style={{ width: `${primaryKpi.progress}%` }} />
          </div>
        </div>
        {kpis.map((k) =>
        <div key={k.label} className="glass-card p-4">
            <p className="text-sm text-slate-400">{k.label}</p>
            <p className="mt-1 text-2xl font-semibold">{k.value}</p>
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <section className="glass-card p-4" aria-labelledby="activity-title">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 id="activity-title" className="text-sm font-semibold">
              Lessons completed this week
            </h3>
            <div className="flex gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-success" /> Offline
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-primary" /> Online
              </span>
            </div>
          </div>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} barSize={22}>
                <CartesianGrid vertical={false} stroke={c.grid} />
                <XAxis dataKey="day" stroke={c.axis} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke={c.axis} tickLine={false} axisLine={false} fontSize={12} width={32} />
                <Tooltip
                  cursor={{ fill: c.cursor }}
                  contentStyle={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: c.label }} />
                
                <Bar dataKey="offline" name="Offline" stackId="a" fill="#10B981" />
                <Bar dataKey="online" name="Online" stackId="a" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass-card p-4" aria-labelledby="mastery-title">
          <h3 id="mastery-title" className="text-sm font-semibold">
            Topic mastery
          </h3>
          <ul className="mt-4 space-y-4">
            {topicMastery.map((m) =>
            <li key={m.topic}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{m.topic}</span>
                  <span className="tabular-nums text-slate-400">{m.mastery}%</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-slate-800">
                  <div className={`h-full rounded-full ${masteryColor(m.mastery)}`} style={{ width: `${m.mastery}%` }} />
                </div>
              </li>
            )}
          </ul>
        </section>
      </div>

      <section className="glass-card overflow-hidden" aria-labelledby="attention-title">
        <h3 id="attention-title" className="px-5 pt-5 text-sm font-semibold">
          Learners who may need support
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-y border-slate-800 text-left text-xs text-slate-500">
                <th className="px-5 py-2.5 font-medium">Learner</th>
                <th className="px-5 py-2.5 font-medium">Weakest topic</th>
                <th className="px-5 py-2.5 font-medium">Mastery</th>
                <th className="px-5 py-2.5 font-medium">Last synced</th>
              </tr>
            </thead>
            <tbody>
              {attentionLearners.map((l) =>
              <tr key={l.name} className="border-b border-slate-800/70 last:border-0">
                  <td className="px-5 py-3 font-medium text-slate-100">{l.name}</td>
                  <td className="px-5 py-3 text-slate-400">{l.topic}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-warn/10 px-2 py-0.5 text-xs font-medium text-warn">{l.mastery}%</span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{l.lastSync}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}