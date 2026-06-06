import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getResponses, computeStats, classify } from '../lib/storage.js'

function npsColor(nps) {
  if (nps >= 50) return 'text-green-600'
  if (nps >= 0) return 'text-amber-500'
  return 'text-red-600'
}

function StatCard({ label, value, hint, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${accent ?? 'text-slate-800'}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

function DistributionBar({ stats }) {
  const segments = [
    { key: 'promoters', label: 'Promotores', pct: stats.promotersPct, color: 'bg-green-500' },
    { key: 'passives', label: 'Neutros', pct: stats.passivesPct, color: 'bg-amber-400' },
    { key: 'detractors', label: 'Detratores', pct: stats.detractorsPct, color: 'bg-red-500' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-semibold text-slate-700">Distribuição</h3>
      <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-slate-100">
        {segments.map((s) => (
          <div
            key={s.key}
            className={s.color}
            style={{ width: `${s.pct}%` }}
            title={`${s.label}: ${s.pct}%`}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        {segments.map((s) => (
          <div key={s.key} className="flex items-center gap-2">
            <span className={`inline-block h-3 w-3 rounded-full ${s.color}`} />
            <span className="text-slate-600">{s.label}</span>
            <span className="ml-auto font-semibold text-slate-800">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const GROUP_BADGE = {
  promoter: { label: 'Promotor', cls: 'bg-green-100 text-green-700' },
  passive: { label: 'Neutro', cls: 'bg-amber-100 text-amber-700' },
  detractor: { label: 'Detrator', cls: 'bg-red-100 text-red-700' },
}

export default function Dashboard() {
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getResponses()
      .then((data) => {
        if (active) setResponses(data)
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const stats = useMemo(() => computeStats(responses), [responses])

  // As respostas já chegam ordenadas (mais recentes primeiro) do backend.
  const sorted = responses

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard de NPS</h1>
          <p className="mt-1 text-slate-500">Resultados das pesquisas de satisfação.</p>
        </div>
      </div>

      {loading ? (
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          Carregando resultados...
        </div>
      ) : error ? (
        <div className="mt-10 bg-red-50 rounded-2xl border border-red-200 p-12 text-center text-red-600">
          Erro ao carregar os dados: {error}
        </div>
      ) : responses.length === 0 ? (
        <div className="mt-10 bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-500">Ainda não há respostas registradas.</p>
          <Link
            to="/"
            className="mt-4 inline-block px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Responder pesquisa
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="NPS"
              value={stats.nps}
              hint="Promotores % − Detratores %"
              accent={npsColor(stats.nps)}
            />
            <StatCard label="Total de respostas" value={stats.total} />
            <StatCard
              label="Promotores"
              value={`${stats.promoters}`}
              hint={`${stats.promotersPct}% · notas 9-10`}
              accent="text-green-600"
            />
            <StatCard
              label="Detratores"
              value={`${stats.detractors}`}
              hint={`${stats.detractorsPct}% · notas 0-6`}
              accent="text-red-600"
            />
          </div>

          <div className="mt-6">
            <DistributionBar stats={stats} />
          </div>

          <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <h3 className="px-6 py-4 text-sm font-semibold text-slate-700 border-b border-slate-100">
              Respostas recentes
            </h3>
            <div className="divide-y divide-slate-100">
              {sorted.map((r, idx) => {
                const group = classify(r.score)
                const badge = GROUP_BADGE[group]
                return (
                  <div key={idx} className="px-6 py-4 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-bold text-slate-700">
                      {r.score}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge.cls}`}>
                          {badge.label}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(r.createdAt).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-700">
                        {r.comment ? r.comment : <span className="text-slate-400 italic">Sem comentário</span>}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
