#!/usr/bin/env node

const API_BASE = 'https://ll.thespacedevs.com/2.2.0'
const PER_PAGE = 100
const MAX_PREVIOUS = 300
const DELAY_MS = 3000

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url)
    if (res.status === 429) {
      console.error(`Rate limited, waiting 15s (attempt ${i + 1}/${retries})...`)
      await sleep(15000)
      continue
    }
    return res
  }
  return { ok: false, status: 429, statusText: 'Rate limited after retries' }
}

async function fetchAll(endpoint, maxResults = Infinity) {
  const results = []
  let url = `${API_BASE}/${endpoint}/?limit=${PER_PAGE}&mode=detailed`
  let totalCount = 0

  while (url && results.length < maxResults) {
    console.error(`Fetching: ${url}`)
    const res = await fetchWithRetry(url)
    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`)
      break
    }
    const data = await res.json()
    totalCount = data.count || totalCount
    results.push(...(data.results || []))
    url = data.next || null

    if (url) await sleep(DELAY_MS)
  }

  return { count: totalCount, results }
}

async function main() {
  console.error('Fetching upcoming launches...')
  const upcoming = await fetchAll('launch/upcoming')
  console.error(`Got ${upcoming.results.length} upcoming launches`)

  // Wait before hitting the other endpoint
  console.error('Waiting 10s before fetching previous...')
  await sleep(10000)

  console.error('Fetching previous launches...')
  const previous = await fetchAll('launch/previous', MAX_PREVIOUS)
  console.error(`Got ${previous.results.length} previous launches`)

  const output = {
    lastUpdated: new Date().toISOString(),
    upcoming,
    previous,
  }

  process.stdout.write(JSON.stringify(output))
  console.error('Done!')
}

main().catch(err => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
