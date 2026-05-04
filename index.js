/**
 * a11ygate-web — A11yGate™ Web Worker
 * BRAND_SPEC.md v2.0 compliant — 2026-05-04
 *
 * Canonical tagline: "Access Is The Gate."
 * Positioning: Accessibility proof infrastructure for governed digital systems
 *
 * Routes (Brand Book v2 §4 Route Registry):
 *   /                → public authority homepage
 *   /standard        → standard-in-progress summary + GitHub links
 *   /proof           → PAR™ explainer + SealForge handoff
 *   /registry        → PAR registry overview
 *   /glossary        → public definitions (backed by sf_glossary D1)
 *   /install         → CLI developer onboarding
 *   /reference-font  → TRS + A11yGate Reference Font
 *   /manual-review   → human review boundary explanation
 *   /governance      → decision logs, waiver doctrine, supersedes
 *   /contact         → professional inquiry routing
 *   /par/:id         → 302 → sealforge.io/r/:id
 *   /health          → minimal JSON only
 *
 *   a11ygate.com/*   → 301 → a11ygate.org
 *   a11ygate.io/*    → 301 → a11ygate.org/install (not root — per Brand Book v2)
 *   www.a11ygate.org → 301 → a11ygate.org
 *
 * PROTECTED — never expose on root domain:
 *   /console, /api/d1/*, /api/health/full, /raw, /internal, /doctrine
 *
 * assertPublicSafe(): guards homepage against internal console content leaking
 */

const SEALFORGE = 'https://sealforge.io';
const GITHUB_ORG = 'https://github.com/A11ygate';

// Brand Book v2 §9 — Forbidden words on public pages
const BANNED_PUBLIC_TERMS = [
  'ELEOS Reality Engine',
  'Console v1.2.1',
  'mirrorprotocol.ai',
  'D1 tables',
  'RAW ENDPOINT',
  'Health Full Status',
  'Repair Types',
  'Repair Scoring',
  'Repair Failures',
  'Cross-Ref Domains',
  'State Schema',
  'The string did not match the expected pattern',
];

// Brand Book v2 §9 — Required authority terms on homepage
const REQUIRED_PUBLIC_TERMS = [
  'A11yGate',
  'Access Is The Gate',
  'accessibility proof infrastructure',
  'Proof-of-Accessibility Record',
  'SealForge',
  'Ellari Ventures LLC',
];

function assertPublicSafe(html) {
  for (const term of BANNED_PUBLIC_TERMS) {
    if (html.includes(term)) {
      console.error(`PUBLIC SAFETY VIOLATION: banned term found: ${term}`);
      return errorPage(`Internal content guard triggered. This is a deployment error.`);
    }
  }
  for (const term of REQUIRED_PUBLIC_TERMS) {
    if (!html.includes(term)) {
      console.error(`PUBLIC SAFETY VIOLATION: required term missing: ${term}`);
      return errorPage(`Required authority content missing. This is a deployment error.`);
    }
  }
  return html;
}

// Brand Book §10 — Color Palette
const B = {
  black:  '#1A1A1A',
  cream:  '#F9F6F1',
  gold:   '#D6B168',
  blue:   '#2F6FED',
  green:  '#2E7D5B',
  amber:  '#B7791F',
  red:    '#A63A3A',
  gray:   '#6B7280',
  border: '#E8E2D9',
};

export default {
  async scheduled(event, env, ctx) {
    // Cron handler — triggered by wrangler.toml cron triggers
    const cron = event.cron;
    if (cron === '0 6 * * 1') {
      // Weekly: log expiring records (email notifications in Phase 3)
      await env.DB.prepare(
        "UPDATE a11ygate_monitoring_log SET published=0 WHERE checked_at < datetime('now','-7 days')"
      ).run();
    }
    if (cron === '0 0 1 * *') {
      // Monthly: mark random 15% for spot check
      await env.DB.prepare(
        "UPDATE a11ygate_registry SET monitoring_status='spot_check_due' WHERE published=1 AND status='active' AND ABS(RANDOM()) % 100 < 15"
      ).run();
    }
  },

  async fetch(request, env) {
    const url  = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname.replace(/\/+$/, '') || '/';

    // Protected routes — hard block at root domain
    const protectedPrefixes = ['/console', '/api/d1', '/api/health/full', '/raw', '/internal', '/doctrine'];
    if (path === '/badges')          return html(badgesPage());
    if (path === '/claims-policy')  return html(claimsPolicyPage());
    if (protectedPrefixes.some(p => path.startsWith(p))) {
return new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }

    // Domain routing
    if (host === 'www.a11ygate.org') {
      return Response.redirect(`https://a11ygate.org${path}${url.search}`, 301);
    }
    if (host === 'a11ygate.com' || host === 'www.a11ygate.com') {
      return Response.redirect(`https://a11ygate.org${path}${url.search}`, 301);
    }
    // a11ygate.io → /install (not root — Brand Book v2)
    if (host === 'a11ygate.io') {
      return Response.redirect(`https://a11ygate.org/install${url.search}`, 301);
    }

    // Minimal health only
    if (path === '/health') {
      return Response.json({ ok: true, service: 'a11ygate-web', public: true });
    }

    // PAR redirect
    if (path.startsWith('/par/')) {
      const id = path.replace('/par/', '').replace(/\/$/, '');
      if (!id) return Response.redirect('https://a11ygate.org', 302);
      return Response.redirect(`${SEALFORGE}/r/${id}`, 302);
    }

    // Public routes
    if (path === '/standard')      return html(standardPage());
    if (path === '/proof')         return html(proofPage());
    if (path === '/registry') {
      const lookupId = new URL(request.url).searchParams.get('id');
      if (lookupId) return Response.redirect(`https://a11ygate.org/par/${encodeURIComponent(lookupId.trim())}`, 302);
      return html(await registryPage(env));
    }
    if (path === '/glossary')      return html(glossaryPage());
    if (path === '/install')       return html(installPage());
    if (path === '/reference-font') return html(referenceFontPage());
    if (path === '/manual-review') return html(manualReviewPage());
    if (path === '/governance')    return html(governancePage());
    if (path === '/contact')       return html(contactPage());
    if (path.startsWith('/badges/'))    return badgeSvg(path.replace('/badges/','').replace('.svg',''), env);
    if (path === '/robots.txt')    return robotsTxt();
    if (path === '/sitemap.xml')    return sitemapXml();
    if (path === '/')              return html(assertPublicSafe(landingPage()));

    return new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
  },
};

function badgesPage() {
  return `${baseHead('A11yGate Badges','How A11yGate verification badges work. What the colors mean. How to embed. What the seal represents.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">Badges</p>
  <h1>Badges mean something here.</h1>
  <p class="lead">An A11yGate badge is a public record marker. It links to a registry entry with scope, date, evidence level, and expiration. Not all badges are equal.</p>
</div></section>
<section class="sec" aria-labelledby="bdg-dist"><div class="c">
  <p class="sec-lbl">Status Types</p>
  <h2 id="bdg-dist">Six statuses. One is not like the others.</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px">
    <div style="padding:16px;border:1px solid #E8E2D9;border-radius:8px">
      <div style="display:inline-block;background:#2E7D5B;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:10px">VERIFIED</div>
      <p style="font-size:13px;color:#1A1A1A;margin:0">A11yGate completed a scoped review. Gate state assigned. Evidence level, scope, and expiration documented.</p>
    </div>
    <div style="padding:16px;border:1px solid #E8E2D9;border-radius:8px">
      <div style="display:inline-block;background:#B7791F;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:10px">CONDITIONAL</div>
      <p style="font-size:13px;color:#1A1A1A;margin:0">Passed with documented limitations. Remediation plan required. Exceptions must have owner and expiration.</p>
    </div>
    <div style="padding:16px;border:1px solid #E8E2D9;border-radius:8px">
      <div style="display:inline-block;background:#6B7280;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:10px">REGISTERED</div>
      <p style="font-size:13px;color:#1A1A1A;margin:0">Record exists. May be self-attested or pending review. <strong>Not the same as Verified.</strong></p>
    </div>
    <div style="padding:16px;border:1px solid #E8E2D9;border-radius:8px">
      <div style="display:inline-block;background:#6B7280;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:10px">EXPIRED</div>
      <p style="font-size:13px;color:#1A1A1A;margin:0">Review period ended. Renewal required before badge can be re-displayed as current.</p>
    </div>
    <div style="padding:16px;border:1px solid #E8E2D9;border-radius:8px">
      <div style="display:inline-block;background:#A63A3A;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:10px">REVOKED</div>
      <p style="font-size:13px;color:#1A1A1A;margin:0">Seal withdrawn. Registry record explains reason. See revocation code.</p>
    </div>
    <div style="padding:16px;border:1px solid #E8E2D9;border-radius:8px">
      <div style="display:inline-block;background:#2F6FED;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:10px">UNDER REVIEW</div>
      <p style="font-size:13px;color:#1A1A1A;margin:0">Active verification or dispute in progress. Status will update when complete.</p>
    </div>
  </div>
</div></section>
<section class="sec" aria-labelledby="bdg-embed"><div class="c">
  <p class="sec-lbl">Embedding</p>
  <h2 id="bdg-embed">One line. Links to the record.</h2>
  <p>Every badge links to its registry record. Anyone who clicks your badge can verify the scope, date, evidence level, and current status independently.</p>
  <div style="background:#F5F2EC;border:1px solid #E8E2D9;border-radius:8px;padding:16px;margin-top:16px;font-family:'IBM Plex Mono',monospace;font-size:12px;color:#1A1A1A;overflow-x:auto">
    &lt;a href="https://a11ygate.org/par/AG-SEAL-XXXXXX" target="_blank" rel="noopener"&gt;<br>
    &nbsp;&nbsp;&lt;img src="https://a11ygate.org/badges/AG-SEAL-XXXXXX.svg"<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alt="A11yGate Verified — [scope] — [date]" width="180"&gt;<br>
    &lt;/a&gt;
  </div>
  <p style="font-size:13px;color:#6B7280;margin-top:12px">Replace AG-SEAL-XXXXXX with your seal ID. Available in your registry record.</p>
</div></section>
<section class="sec" aria-labelledby="bdg-rule"><div class="c">
  <p class="sec-lbl">Display Rules</p>
  <h2 id="bdg-rule">Badges have rules.</h2>
  <ul style="font-size:14px;color:#4A4540;line-height:2;padding-left:20px;max-width:600px">
    <li>Every badge must link to the registry record.</li>
    <li>Expired or revoked badges must not be displayed as current.</li>
    <li>No badge may claim universal accessibility.</li>
    <li>Scope is always required — what was reviewed is part of what the badge means.</li>
  </ul>
</div></section>
<section class="sec" aria-labelledby="bdg-demo"><div class="c">
  <p class="sec-lbl">Live Badges</p>
  <h2 id="bdg-demo">Founding records.</h2>
  <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:16px;align-items:flex-start">
    <div style="text-align:center">
      <img src="/badges/AG-SEAL-20260504-0001.svg" alt="A11yGate founding record — a11ygate.org" width="180" style="display:block;margin:0 auto 8px">
      <p style="font-size:11px;color:#6B7280;margin:0">a11ygate.org · <a href="/par/AG-SEAL-20260504-0001" style="color:var(--blue)">AG-SEAL-20260504-0001</a></p>
    </div>
  </div>
</div></section>
${footer()}</main></body>`;
}

function claimsPolicyPage() {
  return `${baseHead('A11yGate Claims Policy','What A11yGate can and cannot claim. Scope-defined verification language.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">Claims Policy</p>
  <h1>Say exactly what was verified.</h1>
  <p class="lead">A11yGate provides scope-defined accessibility evidence. It is not a substitute for legal advice. It does not guarantee legal compliance.</p>
</div></section>
<section class="sec" aria-labelledby="cp-use"><div class="c">
  <p class="sec-lbl">Approved Language</p>
  <h2 id="cp-use">Use these phrases.</h2>
  <ul style="font-size:14px;color:#4A4540;line-height:2;padding-left:20px;max-width:600px">
    <li>"Verified within stated scope as of [review date]."</li>
    <li>"Reviewed against WCAG 2.2 AA — current as of [date]."</li>
    <li>"See registry record for scope, exceptions, and current status."</li>
    <li>"A11yGate Verified — scope-defined, [date], [evidence level]."</li>
  </ul>
</div></section>
<section class="sec" aria-labelledby="cp-never"><div class="c">
  <p class="sec-lbl">Prohibited Language</p>
  <h2 id="cp-never">Never use these phrases.</h2>
  <ul style="font-size:14px;color:#A63A3A;line-height:2;padding-left:20px;max-width:600px">
    <li>"This website is accessible."</li>
    <li>"This website is ADA compliant."</li>
    <li>"Fully accessible." or "Fully compliant."</li>
    <li>"Guaranteed accessible."</li>
    <li>"Lawsuit-proof." or "ADA-proof."</li>
    <li>"Instant compliance."</li>
  </ul>
  <p style="font-size:13px;color:#6B7280;margin-top:16px;max-width:600px">These claims imply universal accessibility or legal guarantees that no scoped review can provide. A11yGate's doctrine: verify what was reviewed, document what was not.</p>
</div></section>
${footer()}</main></body>`;
}

function errorPage(msg) {
  return `<html><body style="font-family:monospace;padding:2rem;background:#F9F6F1;color:#1A1A1A"><h1>Deployment Error</h1><p>${msg}</p><p>Contact: <a href="mailto:contact@a11ygate.org">contact@a11ygate.org</a></p></body></html>`;
}

function html(body) {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'none'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        `connect-src 'self' ${SEALFORGE}`,
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self' mailto:",
      ].join('; '),
      'X-Product': 'A11yGate',
    },
  });
}



// Badge SVG — dynamic when D1 binding present, static fallback
async function badgeSvg(sealId, env) {
  let rec = { state:'unknown', entity:sealId, expiry:'—', standard:'—' };
  // Try D1 first
  if (env && env.DB) {
    try {
      const row = await env.DB.prepare(
        "SELECT gate_state, property_name, seal_expires_at, standard_map FROM a11ygate_registry WHERE seal_id=? LIMIT 1"
      ).bind(sealId).first();
      if (row) {
        const standards = JSON.parse(row.standard_map || '["WCAG 2.2 AA"]');
        rec = { state: row.gate_state, entity: row.property_name, expiry: row.seal_expires_at?.slice(0,10) || '—', standard: standards[0] || 'WCAG 2.2 AA' };
      }
    } catch(e) { /* fall through to static lookup */ }
  }
  // Static fallback for founding records
  if (rec.state === 'unknown') {
    const known = {
      'AG-SEAL-20260504-0001': { state:'conditional_pass', entity:'a11ygate.org', expiry:'2026-11-04', standard:'WCAG 2.2 AA' },
      'AG-SEAL-20260504-0002': { state:'pending',           entity:'sealforge.io',  expiry:'2026-11-04', standard:'WCAG 2.2 AA' },
    };
    rec = known[sealId] || rec;
  }
  const colors = {
    pass: '#2E7D5B', conditional_pass: '#B7791F',
    pending: '#6B7280', expired: '#A63A3A', revoked: '#A63A3A', unknown: '#6B7280'
  };
  const labels = {
    pass: 'VERIFIED', conditional_pass: 'VERIFIED',
    pending: 'REGISTERED', expired: 'EXPIRED', revoked: 'REVOKED', unknown: '—'
  };
  const bg = colors[rec.state] || '#6B7280';
  const label = labels[rec.state] || rec.state.toUpperCase();

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="52" role="img"'
    + ' aria-label="A11yGate ' + label + ' — ' + rec.entity + ' — ' + rec.standard + '">'
    + '<rect width="240" height="52" rx="3" fill="#1A1A1A"/>'
    + '<rect x="0" y="48" width="240" height="2" fill="#D6B168"/>'
    + '<text x="12" y="18" font-family="IBM Plex Sans,sans-serif" font-size="9"'
    + '  font-weight="600" fill="#D6B168" letter-spacing="0.08em">A11yGATE™</text>'
    + '<rect x="174" y="8" width="58" height="18" rx="2" fill="' + bg + '"/>'
    + '<text x="203" y="20" font-family="IBM Plex Mono,monospace" font-size="8"'
    + '  font-weight="600" fill="#fff" text-anchor="middle" letter-spacing="0.06em">' + label + '</text>'
    + '<text x="12" y="34" font-family="IBM Plex Sans,sans-serif" font-size="10"'
    + '  font-weight="500" fill="#F9F6F1">' + rec.entity + '</text>'
    + '<text x="12" y="46" font-family="IBM Plex Mono,monospace" font-size="8"'
    + '  fill="#6B7280">' + rec.standard + ' · ' + rec.expiry + '</text>'
    + '</svg>';

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
      'X-Seal-Id': sealId,
    },
  });
}

function robotsTxt() {
  return new Response([
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /console',
    'Disallow: /internal',
    'Sitemap: https://a11ygate.org/sitemap.xml',
  ].join('\n'), {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

function sitemapXml() {
  const pages = ['', '/standard', '/proof', '/registry', '/glossary',
    '/install', '/reference-font', '/manual-review', '/governance', '/contact'];
  const nl = '\n';
  const urls = pages.map(p =>
    '  <url><loc>https://a11ygate.org' + p + '</loc><changefreq>weekly</changefreq></url>'
  ).join(nl);
  const body = '<?xml version="1.0" encoding="UTF-8"?>' + nl
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + nl
    + urls + nl
    + '</urlset>';
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
  });
}

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Serif+4:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet">`;

const CSS = `<style>
:root{--black:${B.black};--cream:${B.cream};--gold:${B.gold};--blue:${B.blue};--green:${B.green};--amber:${B.amber};--red:${B.red};--gray:${B.gray};--border:${B.border}}
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{font-family:'IBM Plex Sans',system-ui,sans-serif;background:var(--cream);color:var(--black);line-height:1.65;min-height:100vh}
*{font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0,'dlig' 0}
a{color:var(--blue);text-decoration:none}a:hover{text-decoration:underline}
a:focus-visible{outline:2px solid var(--blue);outline-offset:2px;border-radius:2px}
code{font-family:'IBM Plex Mono',monospace;font-size:.875em;background:rgba(0,0,0,.06);padding:.1em .4em;border-radius:3px}
.c{max-width:900px;margin:0 auto;padding:0 24px}
.cw{max-width:1200px;margin:0 auto;padding:0 24px}
nav{background:var(--black);border-bottom:2px solid var(--gold)}
.ni{display:flex;align-items:center;padding:0 24px;max-width:1200px;margin:0 auto;height:56px}
.nlogo{display:flex;align-items:center;gap:10px;color:var(--cream);font-weight:600;font-size:15px;text-decoration:none}
.nlogo:hover{color:var(--gold);text-decoration:none}
.nlogo:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.nlinks{margin-left:auto;display:flex;gap:24px;align-items:center}
.nlinks a{color:rgba(255,255,255,.65);font-size:13px;font-weight:500;text-decoration:none;transition:color .15s}
.nlinks a:hover{color:var(--cream)}
.ncta{background:var(--gold)!important;color:var(--black)!important;padding:7px 16px;border-radius:3px;font-weight:600;font-size:13px}
.hero{padding:72px 0 60px;border-bottom:2px solid var(--gold)}
.eyebrow{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#7a5a00;margin-bottom:16px}
h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.2rem,5vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;margin-bottom:16px}
.sub{font-family:'Source Serif 4',Georgia,serif;font-size:1.1rem;color:var(--gray);max-width:540px;line-height:1.65;margin-bottom:12px}
.not-overlay{font-family:'IBM Plex Mono',monospace;font-size:14px;color:var(--black);letter-spacing:.01em;margin-bottom:28px;line-height:2}
.not-overlay span{display:block}
.actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:0}
.bp{display:inline-flex;align-items:center;background:var(--black);color:var(--cream);padding:11px 22px;border-radius:3px;font-size:14px;font-weight:600;text-decoration:none}
.bp:hover{background:#333;color:var(--cream);text-decoration:none}
.bs{display:inline-flex;align-items:center;background:transparent;color:var(--black);border:1.5px solid var(--black);padding:10px 22px;border-radius:3px;font-size:14px;font-weight:500;text-decoration:none}
.bs:hover{border-color:var(--gray);text-decoration:none}
.bg{background:var(--gold);color:var(--black);padding:11px 22px;border-radius:3px;font-size:14px;font-weight:600;display:inline-block;text-decoration:none}
.bg:hover{opacity:.9;text-decoration:none;color:var(--black)}
/* Trust bar */
.trust{background:var(--black);border-bottom:1px solid rgba(214,177,104,.2);padding:12px 0}
.trust-inner{display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:center}
.trust-item{font-family:'IBM Plex Mono',monospace;font-size:11px;color:rgba(255,255,255,.5);letter-spacing:.06em}
.trust-item strong{color:var(--gold)}
/* Bands */
.band{background:var(--black);color:var(--cream);padding:48px 0}
.band .eyebrow{color:var(--gold)}
.band h2{font-family:'Playfair Display',serif;font-size:clamp(1.5rem,3vw,2.2rem);font-weight:700;line-height:1.25;margin-bottom:12px}
.band p{color:rgba(255,255,255,.6);max-width:520px;font-size:1rem;line-height:1.65}
.sec{padding:64px 0}
.sec-lbl{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#7a5a00;margin-bottom:12px}
.sec h2{font-family:'Playfair Display',serif;font-size:clamp(1.5rem,3vw,2.2rem);font-weight:700;letter-spacing:-.02em;line-height:1.2;margin-bottom:12px}
.sec p.lead{font-family:'Source Serif 4',serif;color:var(--gray);max-width:520px;font-size:1rem;line-height:1.65}
/* Proof pillars */
.pillars{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1px;border:1px solid var(--border);border-radius:4px;overflow:hidden;margin-top:24px}
.pillar{background:#fff;padding:20px 16px;text-align:center}
.pillar-num{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--gold);letter-spacing:.08em;margin-bottom:6px}
.pillar h3{font-size:14px;font-weight:600;margin-bottom:4px}
.pillar p{font-size:12px;color:var(--gray);line-height:1.4}
/* Proof chain */
.chain{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0;margin-top:20px}
.chain-step{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--black);padding:8px 14px;background:#fff;border:1px solid var(--border)}
.chain-arrow{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gold);padding:0 2px}
/* Gate states */
.states{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.gs{font-family:'IBM Plex Mono',monospace;font-size:11px;padding:4px 10px;border-radius:2px;font-weight:500}
.gs-pass{background:rgba(46,125,91,.1);color:var(--green);border:1px solid var(--green)}
.gs-cond{background:rgba(183,121,31,.1);color:var(--amber);border:1px solid var(--amber)}
.gs-fail{background:rgba(166,58,58,.1);color:var(--red);border:1px solid var(--red)}
.gs-waived{background:rgba(107,114,128,.1);color:var(--gray);border:1px solid var(--gray)}
.gs-exp{background:rgba(107,114,128,.07);color:var(--gray);border:1px dashed var(--gray)}
/* Cards */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1px;border:1px solid var(--border);border-radius:4px;overflow:hidden;margin-top:24px}
.card{background:#fff;padding:22px}
.card h3{font-size:13px;font-weight:600;margin-bottom:6px}
.card p{font-size:13px;color:var(--gray);line-height:1.5}
/* Buyer section */
.buyers{margin-top:24px;display:flex;flex-direction:column;gap:12px}
.buyer{border-left:3px solid var(--gold);padding:12px 16px;background:#fff}
.buyer strong{font-size:13px;font-weight:600;display:block;margin-bottom:2px}
.buyer p{font-size:13px;color:var(--gray)}
/* No-overlay */
.no-overlay{background:var(--black);color:var(--cream);padding:28px 32px;border-radius:4px;margin-top:24px}
.no-overlay .label{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--gold);letter-spacing:.08em;margin-bottom:8px}
.no-overlay p{font-size:14px;color:rgba(255,255,255,.7);line-height:1.6}
/* Standards table */
.tbl{width:100%;border-collapse:collapse;margin-top:18px;font-size:14px}
.tbl th{text-align:left;padding:10px 14px;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--gray);border-bottom:2px solid var(--gold)}
.tbl td{padding:11px 14px;border-bottom:1px solid var(--border)}
.tbl tr:last-child td{border-bottom:none}
.tag{display:inline-block;background:var(--green);color:#fff;font-family:'IBM Plex Mono',monospace;font-size:9px;padding:2px 7px;border-radius:2px;letter-spacing:.04em}
.tag-gold{background:var(--gold);color:var(--black)}
.waiver-rule{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--gray);border:1px solid var(--border);padding:14px 18px;border-radius:3px;margin-top:16px;line-height:1.7}
.doctrine strong{color:var(--black)}
/* CTA band */
.cta-band{background:var(--black);color:var(--cream);padding:64px 0;text-align:center}
.cta-band h2{font-family:'Playfair Display',serif;font-size:clamp(1.75rem,3.5vw,2.4rem);font-weight:700;line-height:1.2;margin-bottom:10px}
.cta-band p{color:rgba(255,255,255,.5);max-width:440px;margin:0 auto 28px;font-family:'Source Serif 4',serif}
.cta-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
/* Footer */
footer{border-top:2px solid var(--gold);padding:28px 0;background:var(--black)}
.fi{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px}
.flogo{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--cream);text-decoration:none}
.flinks{display:flex;flex-wrap:wrap;gap:16px}
.flinks a{color:rgba(255,255,255,.4);font-size:12px;text-decoration:none}
.flinks a:hover{color:var(--cream)}
.fcopy{font-size:11px;color:rgba(255,255,255,.25);font-family:'IBM Plex Mono',monospace}
/* Inner page */
.ph{padding:48px 0 40px;border-bottom:2px solid var(--gold)}
.ph h1{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700;letter-spacing:-.02em;line-height:1.15;margin-bottom:12px}
.ph p{font-family:'Source Serif 4',serif;color:var(--gray);font-size:1.05rem;max-width:520px}
pre{background:var(--black);color:#E0E0D8;padding:20px 24px;border-radius:4px;font-size:13px;overflow-x:auto;margin-top:14px;line-height:1.7}
.status-bar{background:#FAF8F4;border:1px solid var(--border);border-radius:3px;padding:10px 16px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray);margin-bottom:32px}
.status-bar strong{color:var(--gold)}
@media(max-width:600px){.nlinks .nh{display:none}.hero{padding:48px 0 36px}.cards,.pillars{grid-template-columns:1fr}.cta-row{flex-direction:column;align-items:center}}
</style>`;

function baseHead(title, desc) {
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta name="theme-color" content="${B.black}">
${FONTS}${CSS}</head>`;
}

function logo(light=false) {
  const c = light ? B.cream : B.black;
  return `<svg width="24" height="24" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <rect x="8" y="8" width="84" height="84" rx="4" fill="none" stroke="${c}" stroke-width="5"/>
    <line x1="50" y1="18" x2="15" y2="82" stroke="${c}" stroke-width="5.5" stroke-linecap="round"/>
    <line x1="50" y1="18" x2="85" y2="82" stroke="${c}" stroke-width="5.5" stroke-linecap="round"/>
    <line x1="27" y1="56" x2="73" y2="56" stroke="${B.gold}" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`;
}

function nav() {
  return `<nav role="navigation" aria-label="Main"><div class="ni">
    <a class="nlogo" href="/" aria-label="A11yGate home">${logo(true)} A11yGate™</a>
    <div class="nlinks">
      <a href="/standard" class="nh">Standard</a>
      <a href="/proof" class="nh">Proof</a>
      <a href="/registry" class="nh">Registry</a>
      <a href="/governance" class="nh">Governance</a>
      <a class="ncta" href="/install">Install CLI</a>
    </div>
  </div></nav>`;
}

function foot() {
  return `<footer role="contentinfo"><div class="cw"><div class="fi">
    <a class="flogo" href="/">${logo(true)} A11yGate™</a>
    <div class="flinks">
      <a href="/standard">Standard</a>
      <a href="/proof">Proof Chain</a>
      <a href="/registry">Registry</a>
      <a href="/glossary">Glossary</a>
      <a href="/governance">Governance</a>
      <a href="/manual-review">Manual Review</a>
      <a href="/install">CLI</a>
      <a href="${GITHUB_ORG}" target="_blank" rel="noopener">GitHub</a>
      <a href="${SEALFORGE}" target="_blank" rel="noopener">SealForge</a>
      <a href="/contact">Contact</a>
    </div>
    <div class="fcopy">Access Is The Gate. · Ellari Ventures LLC · Standard in progress</div>
  </div></div></footer>`;
}

function landingPage() {
  return `${baseHead('A11yGate™ — Access Is The Gate.','A11yGate™ is accessibility proof infrastructure for governed digital systems. Not an overlay. Not a promise. A record.')}
<body>${nav()}

<!-- Trust Bar -->
<div class="trust" role="banner" aria-label="Authority indicators">
  <div class="trust-inner">
    <span class="trust-item">Maintained by <strong>Ellari Ventures LLC</strong></span>
    <span class="trust-item"><strong>Standard</strong> in progress</span>
    <span class="trust-item">Reference artifacts on <strong>GitHub</strong></span>
    <span class="trust-item">Verification records sealed through <strong>SealForge™</strong></span>
  </div>
</div>

<main>
<!-- Hero -->
<section class="hero"><div class="c">
  <p class="eyebrow">Accessibility Proof Infrastructure</p>
  <h1>Access Is<br>The Gate.</h1>
  <p class="sub">A11yGate™ is accessibility proof infrastructure for governed digital systems. It helps teams create scope-defined accessibility records for websites, applications, documents, and APIs.</p>
  <div class="not-overlay" aria-label="Product positioning">
    <span>Not an overlay.</span>
    <span>Not a promise.</span>
    <span>A record.</span>
  </div>
  <!-- Three CTAs: Brand Book v2 §11 -->
  <div class="actions">
    <a class="bp" href="/standard">View The Standard</a>
    <a class="bs" href="/proof">See The Proof Chain</a>
    <a class="bg" href="/install">Install The CLI</a>
  </div>
</div></section>

<!-- Problem band -->
<section class="band" aria-labelledby="p1"><div class="c">
  <p class="eyebrow">The Problem</p>
  <h2 id="p1">Accessibility claims are often<br>too vague to review.</h2>
  <p>WebAIM's 2026 report found WCAG failures on 95.9% of home pages tested. A11yGate turns accessibility work into structured evidence: what was tested, what passed, what failed, what was waived, and when the record expires. The result is a proof record a team can inspect, maintain, and verify.</p>
</div></section>

<!-- Five Proof Pillars: Brand Book v2 §3 -->
<section class="sec" aria-labelledby="p2"><div class="c">
  <p class="sec-lbl">The A11yGate Proof Model</p>
  <h2 id="p2">Five parts. Every record.</h2>
  <div class="pillars" role="list">
    <div class="pillar" role="listitem"><div class="pillar-num">01</div><h3>Scope</h3><p>What was reviewed</p></div>
    <div class="pillar" role="listitem"><div class="pillar-num">02</div><h3>Evidence</h3><p>What was found</p></div>
    <div class="pillar" role="listitem"><div class="pillar-num">03</div><h3>Gate State</h3><p>What decision was reached</p></div>
    <div class="pillar" role="listitem"><div class="pillar-num">04</div><h3>Seal</h3><p>What record was locked</p></div>
    <div class="pillar" role="listitem"><div class="pillar-num">05</div><h3>Maintenance</h3><p>What expires or supersedes</p></div>
  </div>
</div></section>

<!-- Proof Chain -->
<section class="sec" style="padding-top:0" aria-labelledby="p3"><div class="c">
  <p class="sec-lbl">Proof Chain</p>
  <h2 id="p3">Scan → Attest → Seal → Verify → Maintain</h2>
  <div class="chain" role="list" aria-label="Proof chain steps">
    <span class="chain-step" role="listitem">Scan</span><span class="chain-arrow">→</span>
    <span class="chain-step" role="listitem">Attest</span><span class="chain-arrow">→</span>
    <span class="chain-step" role="listitem">Seal</span><span class="chain-arrow">→</span>
    <span class="chain-step" role="listitem">Verify</span><span class="chain-arrow">→</span>
    <span class="chain-step" role="listitem">Maintain</span>
  </div>
</div></section>

<!-- Gate States -->
<section class="sec" style="padding-top:0;border-bottom:1px solid var(--border)" aria-labelledby="p4"><div class="c">
  <p class="sec-lbl">Gate States</p>
  <h2 id="p4">Five review decisions.</h2>
  <div class="states" role="list" aria-label="Gate state options">
    <span class="gs gs-pass" role="listitem">pass</span>
    <span class="gs gs-cond" role="listitem">conditional_pass</span>
    <span class="gs gs-fail" role="listitem">fail</span>
    <span class="gs gs-waived" role="listitem">waived</span>
    <span class="gs gs-exp" role="listitem">expired</span>
  </div>
  <div class="waiver-rule" aria-label="Waiver rule"><strong>No silent exceptions.</strong> Every waiver requires an owner, reason, and expiration or remediation deadline.</div>
</div></section>

<!-- PAR Definition -->
<section class="sec" aria-labelledby="p5"><div class="c">
  <p class="sec-lbl">PAR™</p>
  <h2 id="p5">Proof-of-Accessibility Record.</h2>
  <p class="lead">PAR™ means Proof-of-Accessibility Record. It is a scoped accessibility proof record — not a vague accessibility badge. A PAR records what was reviewed, when, how, against what criteria, and with what result. It can be sealed through SealForge™ and verified publicly.</p>
  <p style="margin-top:14px;font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--gray)">Verify a record: <a href="${SEALFORGE}" target="_blank" rel="noopener">sealforge.io</a> · Look up a PAR: <a href="/registry">/registry</a></p>
</div></section>

<!-- Standards -->
<section class="sec" style="border-bottom:1px solid var(--border);padding-top:0" aria-labelledby="p6"><div class="c">
  <p class="sec-lbl">Standards Mapping</p>
  <h2 id="p6">Mapped to what governs access.</h2>
  <table class="tbl" role="table"><thead>
    <tr><th scope="col">Standard</th><th scope="col">A11yGate use</th></tr>
  </thead><tbody>
    <tr><td>WCAG 2.1 AA / WCAG 2.2</td><td>Technical web accessibility criteria</td></tr>
    <tr><td>ADA Title II Web/Mobile Rule</td><td>Public entity compliance context</td></tr>
    <tr><td>Section 508</td><td>U.S. federal ICT procurement requirements</td></tr>
    <tr><td>European Accessibility Act</td><td>EU-wide product/service readiness</td></tr>
    <tr><td>PDF/Document Accessibility</td><td>Document review and remediation</td></tr>
    <tr><td><strong>A11yGate Standard™</strong></td><td>Gate states, waivers, evidence, seal logic</td></tr>
  </tbody></table>
</div></section>

<!-- Buyer Translation: Brand Book v2 §12 -->
<section class="sec" aria-labelledby="p7"><div class="c">
  <p class="sec-lbl">Who It Serves</p>
  <h2 id="p7">Built for teams that need<br>reviewable accessibility evidence.</h2>
  <div class="buyers" role="list">
    <div class="buyer" role="listitem"><strong>Public agencies</strong><p>Organize accessibility records, waivers, remediation deadlines, and review dates for DOJ Title II and Section 508 obligations.</p></div>
    <div class="buyer" role="listitem"><strong>Vendors</strong><p>Show what was reviewed and what passed before procurement asks for evidence.</p></div>
    <div class="buyer" role="listitem"><strong>Developers</strong><p>Turn accessibility checks into CI-ready evidence records with gate states and seal references.</p></div>
    <div class="buyer" role="listitem"><strong>Legal and compliance teams</strong><p>Review scoped accessibility records with defensible scope language, not vague claims.</p></div>
  </div>
  <!-- Anti-overlay: Brand Book v2 §13 -->
  <div class="no-overlay" role="note">
    <p class="label">Not An Overlay</p>
    <p>A11yGate is not an accessibility overlay widget. It does not hide barriers behind a toolbar. It creates records: scope, evidence, gate state, waiver logic, remediation status, expiration date, and SealForge verification reference.</p>
  </div>
</div></section>

<!-- CTA: Three audience CTAs -->
<section class="cta-band" aria-labelledby="p8"><div class="c">
  <p class="sec-lbl" style="color:var(--gold)">Get Started</p>
  <h2 id="p8">Access must be maintained,<br>not announced.</h2>
  <p>Start with what can be tested, recorded, and verified today.</p>
  <div class="cta-row">
    <a class="bp" href="/standard">View The Standard</a>
    <a class="bg" href="/proof">See The Proof Chain</a>
    <a class="bs" style="border-color:rgba(255,255,255,.3);color:var(--cream)" href="/install">Install The CLI</a>
  </div>
</div></section>

</main>${foot()}</body></html>`;
}

function standardPage() {
  return `${baseHead('A11yGate Standard™','The A11yGate Standard maps to WCAG 2.2, ADA Title II, Section 508, and EN 301 549.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">A11yGate Standard™</p>
  <div class="status-bar"><strong>Standard in progress</strong> · v1.2 public reference artifacts available on <a href="${GITHUB_ORG}/a11ygate-spec" target="_blank" rel="noopener">GitHub</a></div>
  <h1>The Standard.</h1>
  <p>A11yGate does not replace WCAG, ADA Title II, Section 508, PDF/UA, or the European Accessibility Act. It defines how accessibility evidence is structured, how gate states are assigned, how waivers are governed, and how records are sealed and maintained.</p>
</div></section>
<section class="sec"><div class="c">
  <p class="sec-lbl">A11yGate Standard v0.1 — Twelve Domains</p>
  <h2 style="margin-bottom:18px">What gets reviewed.</h2>
  <table class="tbl" role="table" aria-label="A11yGate Standard v0.1 domains"><thead>
    <tr><th scope="col">#</th><th scope="col">Domain</th><th scope="col">What it covers</th><th scope="col">Standard ref</th></tr>
  </thead><tbody>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">01</td><td><strong>Visual Access</strong></td><td>Contrast, text scaling, layout stability, focus visibility</td><td style="font-size:12px;color:var(--gray)">WCAG</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">02</td><td><strong>Navigation Access</strong></td><td>Keyboard, tab order, skip links, focus traps</td><td style="font-size:12px;color:var(--gray)">WCAG</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">03</td><td><strong>Assistive Tech Access</strong></td><td>Screen reader path, labels, roles, announcements</td><td style="font-size:12px;color:var(--gray)">WCAG</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">04</td><td><strong>Form Access</strong></td><td>Labels, errors, instructions, recovery</td><td style="font-size:12px;color:var(--gray)">WCAG / public service</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">05</td><td><strong>Cognitive Access</strong></td><td>Plain language, predictable flows, low-friction decisions</td><td style="font-size:12px;color:var(--gray)">WCAG 2.2-informed</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">06</td><td><strong>Document Access</strong></td><td>PDFs, downloads, forms, alternate formats</td><td style="font-size:12px;color:var(--gray)">Section 508 / procurement</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">07</td><td><strong>Mobile Access</strong></td><td>App flows, zoom, orientation, touch target logic</td><td style="font-size:12px;color:var(--gray)">DOJ Title II / WCAG</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">08</td><td><strong>Authentication Access</strong></td><td>Login, MFA, CAPTCHA, password reset, session timeout</td><td style="font-size:12px;color:var(--gray)">A11yGate-specific</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">09</td><td><strong>Transaction Access</strong></td><td>Payment, checkout, submission, confirmation</td><td style="font-size:12px;color:var(--gray)">EAA / commerce</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">10</td><td><strong>AI Interface Access</strong></td><td>Chat, modal, file upload, voice, hallucinated affordances</td><td style="font-size:12px;color:var(--gray)">A11yGate-specific active domain</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">11</td><td><strong>Evidence Governance</strong></td><td>Screenshots, logs, reviewer identity, timestamps</td><td style="font-size:12px;color:var(--gray)">EMET / SealForge layer</td></tr>
    <tr><td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--gray)">12</td><td><strong>Remediation Governance</strong></td><td>Owner, deadline, severity, exception, retest</td><td style="font-size:12px;color:var(--gray)">A11yGate operational</td></tr>
  </tbody></table>
</div></section>
<section class="sec" style="padding-top:0;border-bottom:1px solid var(--border)"><div class="c">
  <p class="sec-lbl">Barrier Queue™ Severity Model</p>
  <h2 style="margin-bottom:18px">Scored by task failure, not technical violation.</h2>
  <table class="tbl" role="table" aria-label="Barrier Queue severity levels"><thead>
    <tr><th scope="col">Level</th><th scope="col">Name</th><th scope="col">Meaning</th><th scope="col">Gate impact</th></tr>
  </thead><tbody>
    <tr><td><span class="gs gs-fail">B0</span></td><td>Access Blocker</td><td>User cannot complete a critical task</td><td>Blocks seal / blocks release</td></tr>
    <tr><td><span class="gs gs-fail">B1</span></td><td>Severe Barrier</td><td>Major friction or workaround required</td><td>Blocks full verification</td></tr>
    <tr><td><span class="gs gs-cond">B2</span></td><td>Material Barrier</td><td>Meaningful degradation for some users</td><td>Conditional pass possible</td></tr>
    <tr><td><span class="gs gs-cond">B3</span></td><td>Remediation Item</td><td>Needs correction; does not block core access</td><td>Track before renewal</td></tr>
    <tr><td><span class="gs gs-pass">B4</span></td><td>Advisory</td><td>Better practice / future risk</td><td>Optional / roadmap</td></tr>
    <tr><td><span class="gs gs-waived">BX</span></td><td>Exception</td><td>Accepted temporarily with rationale</td><td>Requires owner + expiration</td></tr>
  </tbody></table>
  <div class="waiver-rule" style="margin-top:14px"><strong>Severity doctrine:</strong> A contrast issue on decorative text may be B3. A keyboard trap in checkout is B0. Score by task failure.</div>
</div></section>
<section class="sec" style="padding-top:48px"><div class="c">
  <p class="sec-lbl">Public Reference Artifacts</p>
  <h2 style="margin-bottom:20px">v1.2 canonical spec.</h2>
  <div class="cards" role="list">
    <div class="card" role="listitem"><h3>Canonical Spec v1.2</h3><p>12 domains, gate state model, evidence bundle, governance, limitations.</p></div>
    <div class="card" role="listitem"><h3>Gate State Model</h3><p>pass · conditional_pass · fail · waived · expired with waiver rules and expiry enforcement.</p></div>
    <div class="card" role="listitem"><h3>Typography Risk Score</h3><p>TRS = 0.30×CA + 0.20×SS + 0.20×SCS + 0.15×SSR + 0.15×RDC × P</p></div>
    <div class="card" role="listitem"><h3>Barrier Queue™ Schema</h3><p>severity B0–BX · domain · evidence · owner · due_date · retest_status · exception_status</p></div>
    <div class="card" role="listitem"><h3>Audit Report Schema</h3><p>30+ field JSON Schema. gate_state, supersedes chain, barrier counts.</p></div>
    <div class="card" role="listitem"><h3>Decision Logs</h3><p>AG-DEC-0001 through AG-DEC-0005 — why rules were chosen.</p></div>
  </div>
  <p style="margin-top:24px">
    <a href="${GITHUB_ORG}/a11ygate-spec" target="_blank" rel="noopener" class="bp">View on GitHub →</a>
    <a href="/proof" class="bs" style="margin-left:12px">See The Proof Chain</a>
  </p>
</div></section>
</main>${foot()}</body></html>`;
}

function proofPage() {
  return `${baseHead('A11yGate Proof Chain — PAR™','PAR™ means Proof-of-Accessibility Record. A scoped, sealed, verifiable accessibility proof record.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">PAR™ — Proof-of-Accessibility Record</p>
  <h1>The Proof Chain.</h1>
  <p>A11yGate creates the accessibility proof structure. SealForge seals the proof artifact. Together, they produce a record that can be reviewed, verified, superseded, and inspected over time.</p>
</div></section>
<section class="sec"><div class="c">
  <p class="sec-lbl">What a PAR may include</p>
  <h2 style="margin-bottom:20px">Scope-defined. Evidence-backed.</h2>
  <div class="cards" role="list">
    <div class="card" role="listitem"><h3>Artifact reviewed</h3><p>The specific website, application, document, or API that was tested.</p></div>
    <div class="card" role="listitem"><h3>Review scope</h3><p>What was tested and what was explicitly out of scope.</p></div>
    <div class="card" role="listitem"><h3>Standard map</h3><p>Which WCAG / ADA / 508 criteria were evaluated.</p></div>
    <div class="card" role="listitem"><h3>Gate state</h3><p>pass · conditional_pass · fail · waived · expired</p></div>
    <div class="card" role="listitem"><h3>Waivers + remediation</h3><p>Every waiver names an owner, reason, and expiration or remediation deadline.</p></div>
    <div class="card" role="listitem"><h3>Supersedes chain</h3><p>When a record is revised, the new record references the prior one. History is preserved.</p></div>
  </div>
  <div class="waiver-rule" style="margin-top:24px">A PAR does not claim universal accessibility. It records <strong>what was reviewed, when, how, against what criteria, and with what result.</strong></div>
  <p style="margin-top:24px;font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--gray)">Verification: <a href="${SEALFORGE}" target="_blank" rel="noopener">sealforge.io</a> · Registry: <a href="/registry">/registry</a></p>
</div></section>
</main>${foot()}</body></html>`;
}

async function registryPage(env) {
  // Fetch public registry records from D1 if available
  let records = [];
  if (env && env.DB) {
    try {
      const result = await env.DB.prepare(
        "SELECT registry_id, property_name, property_url, gate_state, seal_id, review_date, expiration_date, exception_count, evidence_level, is_founding_record FROM a11ygate_registry WHERE published=1 ORDER BY is_founding_record DESC, review_date DESC LIMIT 50"
      ).all();
      records = result.results || [];
    } catch(e) { /* D1 not bound or error */ }
  }

  const stateClass = { pass:'gs-pass', conditional_pass:'gs-cond', fail:'gs-fail', pending:'gs-waived', expired:'gs-exp' };
  const recordsHtml = records.length > 0
    ? '<table class="tbl" role="table" aria-label="A11yGate Registry"><thead><tr>'
      + '<th scope="col">Property</th><th scope="col">Gate State</th>'
      + '<th scope="col">Standard</th><th scope="col">Reviewed</th>'
      + '<th scope="col">Expires</th><th scope="col">Seal</th>'
      + '</tr></thead><tbody>'
      + records.map(r => {
          const sc = stateClass[r.gate_state] || 'gs-waived';
          const founding = r.is_founding_record
            ? ' <span style="font-size:9px;color:var(--gold);font-weight:700">FOUNDING</span>' : '';
          const reviewed = r.review_date ? r.review_date.slice(0,10) : '—';
          const expires  = r.expiration_date ? r.expiration_date.slice(0,10) : '—';
          const sealShort = r.seal_id ? r.seal_id.slice(-8) : '—';
          return '<tr>'
            + '<td><a href="' + r.property_url + '" target="_blank" rel="noopener" style="color:var(--blue)">'
            + r.property_name + '</a>' + founding + '</td>'
            + '<td><span class="gs ' + sc + '">' + r.gate_state + '</span></td>'
            + '<td style="font-size:12px;color:var(--gray)">WCAG 2.2 AA</td>'
            + '<td style="font-size:11px">' + reviewed + '</td>'
            + '<td style="font-size:11px">' + expires + '</td>'
            + '<td><a href="/par/' + r.seal_id + '" style="font-size:10px;color:var(--blue)">' + sealShort + '</a></td>'
            + '</tr>';
        }).join('')
      + '</tbody></table>'
    : '<p style="color:var(--gray)">Registry records loading. <a href="https://sealforge.io" target="_blank" rel="noopener">Verify a seal at sealforge.io</a></p>';

  return `${baseHead('A11yGate Registry™','PAR Registry — public verification records, seal references, and review history.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">A11yGate Registry™</p>
  <h1>Verification Records.</h1>
  <p>A11yGate records may be published to a registry for verification, renewal, or reference. Registry records show scope, gate state, seal reference, expiration, and supersedes chain. Private evidence may remain restricted while the public verification record stays accessible.</p>
</div></section>
<section class="sec"><div class="c">
  <p class="sec-lbl">Verify a record</p>
  <h2 style="margin-bottom:16px">Look up any PAR.</h2>
  <div style="background:#FFF8ED;border-left:4px solid #B7791F;border-radius:0 8px 8px 0;padding:18px 22px;margin:20px 0;display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:660px" role="note" aria-label="Registered vs Verified distinction"><div><p style="font-size:13px;font-weight:700;color:#1A1A1A;margin:0 0 5px">Registered</p><p style="font-size:12px;color:#5A5248;margin:0;line-height:1.6">A record exists. May be self-attested or pending review. Registered does not mean A11yGate verified the property.</p></div><div><p style="font-size:13px;font-weight:700;color:#2E7D5B;margin:0 0 5px">Verified</p><p style="font-size:12px;color:#5A5248;margin:0;line-height:1.6">A11yGate completed a scoped review and assigned a gate state — with scope, evidence, standard map, and expiration.</p></div></div>
  <form role="search" aria-label="PAR verification" method="GET" action="/registry" style="display:flex;gap:10px;flex-wrap:wrap">
    <input type="text" name="id" placeholder="Verification ID — e.g. AG-20260501-001A" aria-label="Verification ID"
      style="flex:1;min-width:260px;padding:11px 16px;border:1.5px solid var(--border);border-radius:3px;font-size:14px;font-family:'IBM Plex Sans',sans-serif;background:#fff;color:var(--black)">
    <button type="submit" style="background:var(--black);color:var(--cream);border:none;padding:11px 20px;border-radius:3px;font-size:14px;font-weight:600;cursor:pointer">Verify →</button>
  </form>
  <p style="margin-top:14px;font-size:13px;color:var(--gray)">Records also verifiable at <a href="${SEALFORGE}" target="_blank" rel="noopener">sealforge.io</a> — the cryptographic proof layer.</p>
  <p style="margin-top:8px;font-size:13px;color:var(--gray)">Example: <a href="/par/SF-20260412-ec225e59">/par/SF-20260412-ec225e59</a></p>
</div></section>
</main>${foot()}</body></html>`;
}

function glossaryPage() {
  // Public glossary — 15 terms from Brand Book v2 §5
  const terms = [
    ['A11yGate™','Accessibility proof infrastructure for governed digital systems.'],
    ['PAR™','Proof-of-Accessibility Record — a scoped accessibility proof record.'],
    ['Gate State','The review decision assigned to an artifact.'],
    ['pass','The artifact meets the defined review scope.'],
    ['conditional_pass','The artifact can proceed with documented limitations.'],
    ['fail','The artifact does not meet the defined review threshold.'],
    ['waived','A temporary exception with owner, reason, and expiration/remediation.'],
    ['expired','A record that is no longer current.'],
    ['SealForge™','Verification infrastructure that seals proof artifacts cryptographically.'],
    ['Supersedes Chain','A lineage showing which record replaced an earlier one.'],
    ['Typography Risk Score','A score measuring typography ambiguity and rendering risk (TRS).'],
    ['Reference Font','A controlled font used as a validation instrument for TRS measurement.'],
    ['Manifest','Machine-readable evidence record accompanying a sealed artifact.'],
    ['Manual Review','Human review for accessibility issues automation cannot fully judge.'],
    ['Standard In Progress','A published framework evolving through versioned releases.'],
  ];
  return `${baseHead('A11yGate Glossary','Public definitions for A11yGate accessibility proof terms.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">A11yGate Glossary · Public v0.1</p>
  <h1>Public Definitions.</h1>
  <p>Definitions for terms used in A11yGate proof records, gate states, and verification infrastructure. Terms are versioned. Full glossary available at <a href="${SEALFORGE}/glossary" target="_blank" rel="noopener">sealforge.io/glossary</a>.</p>
</div></section>
<section class="sec"><div class="c">
  <dl style="display:flex;flex-direction:column;gap:16px">
    ${terms.map(([t,d]) => `<div style="border-left:3px solid var(--gold);padding:10px 16px;background:#fff">
      <dt style="font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:600;color:var(--black);margin-bottom:4px">${t}</dt>
      <dd style="font-size:14px;color:var(--gray)">${d}</dd>
    </div>`).join('')}
  </dl>
</div></section>
</main>${foot()}</body></html>`;
}

function referenceFontPage() {
  return `${baseHead('A11yGate Reference Font — TRS','The A11yGate Reference Font is a validation instrument for typography risk scoring.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">A11yGate Reference Font · TRS</p>
  <h1>Typography as evidence.</h1>
  <p>The A11yGate Reference Font is a validation instrument — not the A11yGate brand font. It supports typography risk scoring by providing a controlled reference render target. TRS is one module of A11yGate. It does not replace broader accessibility review.</p>
</div></section>
<section class="sec"><div class="c">
  <p class="sec-lbl">Typography Risk Score (TRS)</p>
  <h2 style="margin-bottom:16px">Five categories. One score.</h2>
  <pre><code>TRS = (0.30×CA + 0.20×SS + 0.20×SCS + 0.15×SSR + 0.15×RDC) × P

CA  = Character Ambiguity    (DVS pair render quality)
SS  = Spacing Safety         (WCAG 1.4.12 compliance)
SCS = Stroke/Contrast        (thick/thin ratio)
SSR = Small-Size Rendering   (12px, 14px integrity)
RDC = Render Delta           (cross-environment variance)
P   = Penalty (0.85 if any category <60; 0.75 if any <50)</code></pre>
  <p style="margin-top:20px"><a href="${GITHUB_ORG}/a11ygate-reference-font" target="_blank" rel="noopener" class="bp">View Source on GitHub →</a></p>
</div></section>
</main>${foot()}</body></html>`;
}

function manualReviewPage() {
  return `${baseHead('A11yGate Manual Review','Automated checks cannot fully determine accessibility. A11yGate includes manual review procedures for issues that require human judgment.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">Manual Review Boundary</p>
  <h1>Automation has limits.</h1>
  <p>A11yGate includes manual review procedures for accessibility issues that require human judgment. Manual review is used to strengthen the proof record, not replace recognized accessibility standards.</p>
</div></section>
<section class="sec"><div class="c">
  <p class="sec-lbl">Manual review covers</p>
  <h2 style="margin-bottom:20px">What a scan cannot decide.</h2>
  <div class="cards" role="list">
    <div class="card" role="listitem"><h3>Reading order</h3><p>Does the document flow logically when navigated non-visually?</p></div>
    <div class="card" role="listitem"><h3>Charts and data visuals</h3><p>Are data relationships conveyed in text, not color alone?</p></div>
    <div class="card" role="listitem"><h3>Form instructions and errors</h3><p>Are error messages specific, actionable, and accessible?</p></div>
    <div class="card" role="listitem"><h3>Color-only meaning</h3><p>Is information conveyed through more than color?</p></div>
    <div class="card" role="listitem"><h3>Math and notation</h3><p>Is mathematical content accessible without visual rendering?</p></div>
    <div class="card" role="listitem"><h3>Plain-language clarity</h3><p>Is content understandable by the intended audience?</p></div>
    <div class="card" role="listitem"><h3>Keyboard path logic</h3><p>Can all tasks be completed in a logical keyboard sequence?</p></div>
    <div class="card" role="listitem"><h3>Cognitive load</h3><p>Are timeouts, animations, and complex flows accessible?</p></div>
  </div>
  <p style="margin-top:24px;font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--gray)">Manual review strengthens L2 PAR records. See <a href="/proof">/proof</a> for PAR levels.</p>
</div></section>
</main>${foot()}</body></html>`;
}

function governancePage() {
  return `${baseHead('A11yGate Governance','Versioned specs, decision logs, gate states, waiver rules, expiration dates, supersedes chains, and SealForge verification.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">Governance</p>
  <h1>Reviewable over time.</h1>
</div></section>
<section style="background:#1A1A1A;padding:28px 0" aria-label="No silent exceptions rule"><div class="c"><p style="font-size:22px;font-weight:700;color:#F9F6F1;margin:0 0 10px">No Silent Exceptions.</p><p style="font-size:14px;color:#B0A898;line-height:1.65;max-width:600px;margin:0">A waived finding must include an owner, a reason, and either an expiration date or a remediation deadline. Waivers without these fields are invalid. Every record is reviewable. No exception is hidden.</p></div></section>
<section class="ph" style="padding-top:10px"><div class="c">
  <p>A11yGate records are designed to be reviewable over time. The system uses versioned specifications, decision logs, gate states, waiver rules, expiration dates, remediation deadlines, supersedes chains, and SealForge verification references.</p>
</div></section>
<section class="sec"><div class="c">
  <div class="waiver-rule"><strong>No silent exceptions.</strong> A waived record must include an owner, reason, and expiration or remediation deadline. A record with no maintenance date is not governance — it is theater.</div>
  <p class="sec-lbl" style="margin-top:36px">Governance mechanisms</p>
  <table class="tbl" role="table" aria-label="Governance mechanisms"><thead>
    <tr><th scope="col">Mechanism</th><th scope="col">Purpose</th></tr>
  </thead><tbody>
    <tr><td>Versioned specs</td><td>Prevent quiet standard drift</td></tr>
    <tr><td>Decision logs</td><td>Explain why rules changed</td></tr>
    <tr><td>Gate states</td><td>Normalize review decisions</td></tr>
    <tr><td>Waiver rules</td><td>Prevent invisible exceptions</td></tr>
    <tr><td>Expiration dates</td><td>Prevent stale records</td></tr>
    <tr><td>Supersedes chains</td><td>Preserve revision history</td></tr>
    <tr><td>SealForge references</td><td>Verify record integrity</td></tr>
  </tbody></table>
  <p style="margin-top:24px"><a href="${GITHUB_ORG}/a11ygate-spec/tree/main/decisions" target="_blank" rel="noopener" class="bp">View Decision Logs →</a></p>
</div></section>
</main>${foot()}</body></html>`;
}

function installPage() {
  return `${baseHead('Install A11yGate CLI','A11yGate CLI — scan accessibility barriers, generate proof records, integrate into CI/CD.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">Developer Tools · Phase 1</p>
  <h1>Install The CLI.</h1>
  <p>Scan accessibility barriers, generate scope-defined proof records, and integrate accessibility gates into your build pipeline.</p>
</div></section>
<section class="sec"><div class="c">
  <p class="sec-lbl">Quick start</p>
  <h2 style="margin-bottom:14px">Install mirror-a11y.</h2>
  <pre><code><span style="color:${B.gold}"># Install</span>
npm install -g @a11ygate/cli

<span style="color:${B.gold}"># Scan</span>
mirror-a11y scan --type typography https://yoursite.com

<span style="color:${B.gold}"># Generate PAR record</span>
mirror-a11y audit ./font.woff2 --seal --account YOUR_ACCOUNT_ID</code></pre>
  <div class="cards" style="margin-top:28px" role="list">
    <div class="card" role="listitem"><h3>Phase 1 scan types</h3><p><code>typography</code> — disambiguation, spacing, contrast, rendering<br>Coming: <code>color-contrast</code>, <code>keyboard</code>, <code>plain-language</code></p></div>
    <div class="card" role="listitem"><h3>Output formats</h3><p><code>--output json</code> — audit report<br><code>--output md</code> — technical markdown<br><code>--seal</code> — generate PAR via SealForge</p></div>
    <div class="card" role="listitem"><h3>Request access</h3><p>Early access during standard-in-progress phase.<br><a href="/contact" style="color:${B.blue};font-weight:600">contact@a11ygate.org →</a></p></div>
  </div>
</div></section>
</main>${foot()}</body></html>`;
}

function contactPage() {
  return `${baseHead('Contact A11yGate','Professional inquiry routing for A11yGate standards, pilots, and accessibility proof records.')}
<body>${nav()}<main>
<section class="ph"><div class="c">
  <p class="eyebrow">Contact</p>
  <h1>Get in touch.</h1>
  <p>For A11yGate standards, pilots, procurement, accessibility proof records, or implementation questions.</p>
</div></section>
<section class="sec"><div class="c">
  <div class="buyers">
    <div class="buyer"><strong>A11yGate standards, pilots, and proof records</strong>
      <p><a href="mailto:contact@a11ygate.org" style="color:${B.blue}">contact@a11ygate.org</a></p></div>
    <div class="buyer"><strong>SealForge verification infrastructure</strong>
      <p><a href="mailto:hello@sealforge.io" style="color:${B.blue}">hello@sealforge.io</a></p></div>
    <div class="buyer"><strong>GitHub organization</strong>
      <p><a href="${GITHUB_ORG}" target="_blank" rel="noopener" style="color:${B.blue}">github.com/A11ygate</a></p></div>
  </div>
</div></section>
</main>${foot()}</body></html>`;
}

