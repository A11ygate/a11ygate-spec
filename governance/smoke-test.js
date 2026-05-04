/**
 * A11yGate Public Homepage Smoke Test
 * Brand Book v2.0 §14 — Permanent Guardrail
 *
 * Run: node smoke-test.js [url]
 * Default: https://a11ygate-web.ellari.workers.dev
 */

const TARGET = process.argv[2] || 'https://a11ygate-web.ellari.workers.dev';

const REQUIRED = [
  'A11yGate',
  'Access Is The Gate',
  'accessibility proof infrastructure',
  'Proof-of-Accessibility Record',
  'SealForge',
  'Ellari Ventures LLC',
];

const BANNED = [
  'ELEOS Reality Engine',
  'Console v1.2.1',
  'mirrorprotocol.ai',
  'D1 tables',
  'RAW ENDPOINT',
  'Health Full Status',
  'Doctrine',
  'Repair Types',
  'Repair Scoring',
  'State Schema',
  'The string did not match the expected pattern',
];

async function runSmoke() {
  console.log(`\nA11yGate Smoke Test — ${TARGET}\n${'─'.repeat(50)}`);
  let passed = 0, failed = 0;

  try {
    const res = await fetch(TARGET);
    const html = await res.text();
    if (res.status !== 200) { console.error(`❌ HTTP ${res.status}`); process.exit(1); }

    // Security headers
    const secHeaders = [
      'strict-transport-security',
      'x-content-type-options',
      'x-frame-options',
      'content-security-policy',
    ];
    for (const h of secHeaders) {
      if (res.headers.get(h)) { console.log(`✅ header: ${h}`); passed++; }
      else { console.error(`❌ MISSING header: ${h}`); failed++; }
    }

    // Required terms
    for (const term of REQUIRED) {
      if (html.includes(term)) { console.log(`✅ present: "${term}"`); passed++; }
      else { console.error(`❌ MISSING: "${term}"`); failed++; }
    }

    // Banned terms
    for (const term of BANNED) {
      if (!html.includes(term)) { console.log(`✅ absent:  "${term}"`); passed++; }
      else { console.error(`❌ BANNED TERM FOUND: "${term}"`); failed++; }
    }

    // Route checks
    const routes = ['/standard', '/proof', '/registry', '/glossary', '/install', '/governance', '/contact', '/badges', '/claims-policy', '/robots.txt', '/sitemap.xml', '/badges/AG-SEAL-20260504-0001.svg'];
    for (const route of routes) {
      const r = await fetch(TARGET + route);
      if (r.status === 200) { console.log(`✅ route: ${route}`); passed++; }
      else { console.error(`❌ route failed (${r.status}): ${route}`); failed++; }
    }

    // Health check
    const health = await fetch(TARGET + '/health');
    const hJson = await health.json();
    if (hJson.ok === true && hJson.public === true && !hJson.tables && !hJson.debug) {
      console.log(`✅ /health: minimal OK`); passed++;
    } else {
      console.error(`❌ /health exposes internal data: ${JSON.stringify(hJson)}`); failed++;
    }

    // PAR redirect
    const par = await fetch(TARGET + '/par/test-id', { redirect: 'manual' });
    if (par.status === 302) { console.log(`✅ /par/:id → 302`); passed++; }
    else { console.error(`❌ /par/:id wrong status: ${par.status}`); failed++; }


    // Verify X-XSS-Protection is absent (Brand Book v3 — legacy header removed)
    if (!res.headers.get('x-xss-protection')) {
      console.log('✅ security: X-XSS-Protection absent (correct — legacy)');
      passed++;
    } else {
      console.error('❌ security: X-XSS-Protection should be removed (legacy header)');
      failed++;
    }

    // Registry: REGISTERED_VS_VERIFIED callout
    const regResp = await fetch(TARGET + '/registry');
    const regText = await regResp.text();
    if (regText.includes('Registered does not mean A11yGate verified')) {
      console.log('✅ registry: REGISTERED_VS_VERIFIED callout present');
      passed++;
    } else {
      console.error('❌ registry: REGISTERED_VS_VERIFIED callout missing');
      failed++;
    }

  // Badge SVG content check
    const badge = await fetch(TARGET + '/badges/AG-SEAL-20260504-0001.svg');
    const badgeSvg = await badge.text();
    if (badge.headers.get('content-type')?.includes('svg') && badgeSvg.includes('<svg')) {
      console.log('✅ badge: SVG content-type and <svg> tag');
      passed++;
    } else {
      console.error('❌ badge: wrong content-type or missing <svg> tag');
      failed++;
    }
    if (badgeSvg.includes('a11ygate.org')) {
      console.log('✅ badge: entity name present');
      passed++;
    } else {
      console.error('❌ badge: entity name missing');
      failed++;
    }

    console.log(`\n${'─'.repeat(50)}`);
    console.log(`Result: ${passed} passed · ${failed} failed`);
    if (failed > 0) { console.error('SMOKE TEST FAILED'); process.exit(1); }
    else { console.log('SMOKE TEST PASSED ✅'); }

  } catch (e) {
    console.error('Fetch error:', e.message);
    process.exit(1);
  }
}

runSmoke();
