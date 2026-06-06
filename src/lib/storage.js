// Camada simples de persistência usando localStorage.
// Em um cenário real isso seria substituído por chamadas a uma API/backend.

const STORAGE_KEY = 'nps-responses'

/**
 * Retorna todas as respostas de NPS armazenadas.
 * @returns {Array<{score:number, comment:string, createdAt:string}>}
 */
export function getResponses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('Erro ao ler respostas do localStorage:', err)
    return []
  }
}

/**
 * Salva uma nova resposta de NPS.
 * @param {{score:number, comment:string}} response
 */
export function addResponse(response) {
  const responses = getResponses()
  responses.push({
    score: response.score,
    comment: response.comment?.trim() ?? '',
    createdAt: new Date().toISOString(),
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses))
}

/**
 * Remove todas as respostas armazenadas.
 */
export function clearResponses() {
  localStorage.removeItem(STORAGE_KEY)
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
