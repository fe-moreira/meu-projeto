// Camada de dados das respostas de NPS, persistidas no Supabase.

import { supabase } from './supabaseClient.js'

const TABLE = 'nps_responses'

/**
 * Busca todas as respostas de NPS, ordenadas da mais recente para a mais antiga.
 * @returns {Promise<Array<{id:string, score:number, comment:string, createdAt:string}>>}
 */
export async function getResponses() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, score, comment, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    score: row.score,
    comment: row.comment ?? '',
    createdAt: row.created_at,
  }))
}

/**
 * Salva uma nova resposta de NPS.
 * @param {{score:number, comment:string}} response
 */
export async function addResponse(response) {
  const { error } = await supabase.from(TABLE).insert({
    score: response.score,
    comment: response.comment?.trim() || null,
  })

  if (error) {
    throw new Error(error.message)
  }
}

/**
 * Classifica uma nota de NPS.
 * @param {number} score
 * @returns {'detractor'|'passive'|'promoter'}
 */
export function classify(score) {
  if (score <= 6) return 'detractor'
  if (score <= 8) return 'passive'
  return 'promoter'
}

/**
 * Calcula métricas agregadas de NPS a partir das respostas.
 * @param {Array} responses
 */
export function computeStats(responses) {
  const total = responses.length
  if (total === 0) {
    return {
      total: 0,
      promoters: 0,
      passives: 0,
      detractors: 0,
      promotersPct: 0,
      passivesPct: 0,
      detractorsPct: 0,
      nps: 0,
    }
  }

  let promoters = 0
  let passives = 0
  let detractors = 0

  for (const r of responses) {
    const group = classify(r.score)
    if (group === 'promoter') promoters++
    else if (group === 'passive') passives++
    else detractors++
  }

  const promotersPct = (promoters / total) * 100
  const passivesPct = (passives / total) * 100
  const detractorsPct = (detractors / total) * 100
  const nps = Math.round(promotersPct - detractorsPct)

  return {
    total,
    promoters,
    passives,
    detractors,
    promotersPct: Math.round(promotersPct),
    passivesPct: Math.round(passivesPct),
    detractorsPct: Math.round(detractorsPct),
    nps,
  }
}
