import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addResponse, classify } from '../lib/storage.js'

const SCORES = Array.from({ length: 11 }, (_, i) => i) // 0..10

function scoreColor(score, selected) {
  const group = classify(score)
  if (!selected) {
    return 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
  }
  if (group === 'detractor') return 'bg-red-500 text-white border-red-500'
  if (group === 'passive') return 'bg-amber-400 text-white border-amber-400'
  return 'bg-green-500 text-white border-green-500'
}

export default function SurveyPage() {
  const [score, setScore] = useState(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (score === null) {
      setError('Por favor, selecione uma nota de 0 a 10.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await addResponse({ score, comment })
      setSubmitted(true)
    } catch (err) {
      setError('Não foi possível enviar sua resposta. Tente novamente. ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setScore(null)
    setComment('')
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Obrigado pelo seu feedback!</h2>
          <p className="mt-2 text-slate-500">Sua resposta foi registrada com sucesso.</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={reset}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Enviar outra resposta
            </button>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Ver dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
        <h1 className="text-2xl font-bold text-slate-800">
          Qual a probabilidade de você nos recomendar?
        </h1>
        <p className="mt-2 text-slate-500">
          Em uma escala de 0 a 10, o quanto você recomendaria nosso produto a um amigo ou colega?
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
            {SCORES.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setScore(s)}
                aria-pressed={score === s}
                className={`h-12 rounded-lg border font-semibold transition-colors ${scoreColor(
                  s,
                  score === s,
                )}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>Pouco provável</span>
            <span>Muito provável</span>
          </div>

          <div className="mt-8">
            <label htmlFor="comment" className="block text-sm font-medium text-slate-700">
              Comentário <span className="text-slate-400">(opcional)</span>
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte-nos o motivo da sua nota..."
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full sm:w-auto px-8 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Enviando...' : 'Enviar feedback'}
          </button>
        </form>
      </div>
    </div>
  )
}
